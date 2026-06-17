import React, { useMemo, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import StatCard from '@/components/StatCard';
import SectionHeader from '@/components/SectionHeader';
import { mockAreaStats, mockTimeSlotStats, mockHotPointRanks, mockOverviewStats } from '@/data/dashboard';
import styles from './index.module.scss';

const DashboardPage: React.FC = () => {
  const maxCount = useMemo(() => {
    return Math.max(...mockTimeSlotStats.map(s => s.count));
  }, []);

  const peakHour = useMemo(() => {
    const max = Math.max(...mockTimeSlotStats.map(s => s.count));
    return mockTimeSlotStats.find(s => s.count === max)?.hour || '';
  }, []);

  useEffect(() => {
    console.log('[Dashboard] 区域看板加载完成');
  }, []);

  const getTrendClass = (trend: string): string => {
    if (trend === 'up') return styles.trendUp;
    if (trend === 'down') return styles.trendDown;
    return styles.trendFlat;
  };

  const getTrendText = (trend: string): string => {
    if (trend === 'up') return '↑ 上升';
    if (trend === 'down') return '↓ 下降';
    return '→ 持平';
  };

  const getRankClass = (index: number): string => {
    if (index === 0) return styles.rankIndexTop;
    if (index === 1) return styles.rankIndexSecond;
    if (index === 2) return styles.rankIndexThird;
    return '';
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.header}>
          <Text className={styles.title}>区域看板</Text>
          <Text className={styles.subtitle}>数据概览 · 今日高发时段 {peakHour}:00</Text>
        </View>

        <View className={styles.overview}>
          <StatCard type="total" label="今日告警" value={mockOverviewStats.todayTotal} />
          <StatCard type="unresolved" label="未处理" value={mockOverviewStats.unresolved} />
          <StatCard type="urgent" label="紧急" value={mockOverviewStats.urgent} />
          <StatCard type="rate" label="处理率" value={mockOverviewStats.resolvedRate} unit="%" />
        </View>

        <SectionHeader title="时段分布" />
        <View className={styles.chartCard}>
          <Text className={styles.chartTitle}>今日告警时段分布</Text>
          <View className={styles.chartContent}>
            <View className={styles.chartBars}>
              {mockTimeSlotStats.map(slot => {
                const height = (slot.count / maxCount) * 100;
                return (
                  <View key={slot.hour} className={styles.barItem}>
                    <View
                      className={classnames(
                        styles.barFill,
                        slot.hour === peakHour && styles.barFillPeak
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <Text className={styles.barLabel}>{slot.hour}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <SectionHeader title="高发点位排行" />
        <View className={styles.chartCard}>
          <View className={styles.rankList}>
            {mockHotPointRanks.map((item, index) => (
              <View key={item.id} className={styles.rankItem}>
                <View className={classnames(styles.rankIndex, getRankClass(index))}>
                  <Text>{index + 1}</Text>
                </View>
                <View className={styles.rankInfo}>
                  <Text className={styles.rankName}>{item.name}</Text>
                  <View className={styles.rankBarBg}>
                    <View
                      className={styles.rankBarFill}
                      style={{ width: `${item.rate}%` }}
                    />
                  </View>
                </View>
                <Text className={styles.rankCount}>{item.count}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="各区域统计" />
        <View className={styles.areaList}>
          {mockAreaStats.map(area => (
            <View key={area.id} className={styles.areaItem}>
              <View className={styles.areaHeader}>
                <Text className={styles.areaName}>{area.name}</Text>
                <View className={classnames(styles.areaTrend, getTrendClass(area.trend))}>
                  <Text>{getTrendText(area.trend)}</Text>
                </View>
              </View>
              <View className={styles.areaStats}>
                <View className={styles.areaStatItem}>
                  <Text className={classnames(styles.areaStatValue, styles.valueToday)}>
                    {area.todayCount}
                  </Text>
                  <Text className={styles.areaStatLabel}>今日</Text>
                </View>
                <View className={styles.areaStatItem}>
                  <Text className={classnames(styles.areaStatValue, styles.valueUrgent)}>
                    {area.urgentCount}
                  </Text>
                  <Text className={styles.areaStatLabel}>紧急</Text>
                </View>
                <View className={styles.areaStatItem}>
                  <Text className={classnames(styles.areaStatValue, styles.valueUnresolved)}>
                    {area.unresolvedCount}
                  </Text>
                  <Text className={styles.areaStatLabel}>未处理</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DashboardPage;
