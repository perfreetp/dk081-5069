import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import StatCard from '@/components/StatCard';
import AlertCard from '@/components/AlertCard';
import { AlertItem, AlertStatus } from '@/types';
import { mockAlerts } from '@/data/alerts';
import styles from './index.module.scss';

type FilterType = 'all' | 'pending' | 'processing' | 'resolved' | 'urgent';

interface FilterOption {
  key: FilterType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'processing', label: '处理中' },
  { key: 'urgent', label: '紧急' },
  { key: 'resolved', label: '已处理' }
];

const MessagesPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const stats = useMemo(() => {
    return {
      total: alerts.length,
      pending: alerts.filter(a => a.status === 'pending').length,
      urgent: alerts.filter(a => a.level === 'urgent').length,
      resolved: alerts.filter(a => a.status === 'resolved').length
    };
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    switch (activeFilter) {
      case 'pending':
        return alerts.filter(a => a.status === 'pending');
      case 'processing':
        return alerts.filter(a => a.status === 'processing');
      case 'urgent':
        return alerts.filter(a => a.level === 'urgent');
      case 'resolved':
        return alerts.filter(a => a.status === 'resolved');
      default:
        return alerts;
    }
  }, [alerts, activeFilter]);

  useEffect(() => {
    console.log('[Messages] 页面加载完成，告警数量:', alerts.length);
  }, []);

  const handleFilterClick = (key: FilterType) => {
    setActiveFilter(key);
    console.log('[Messages] 切换筛选:', key);
  };

  const onRefresh = () => {
    console.log('[Messages] 下拉刷新');
    setTimeout(() => {
      setAlerts([...mockAlerts]);
      Taro.stopPullDownRefresh();
      Taro.showToast({ title: '刷新成功', icon: 'success' });
    }, 800);
  };

  useEffect(() => {
    Taro.eventCenter.on('__taroPullDownRefresh', onRefresh);
    return () => {
      Taro.eventCenter.off('__taroPullDownRefresh', onRefresh);
    };
  }, []);

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.header}>
          <Text className={styles.title}>滞留告警</Text>
          <Text className={styles.subtitle}>今日共 {stats.total} 条告警，需关注 {stats.pending + stats.urgent} 条</Text>
        </View>

        <View className={styles.summary}>
          <StatCard type="total" label="今日总数" value={stats.total} />
          <StatCard type="unresolved" label="待处理" value={stats.pending} />
          <StatCard type="urgent" label="紧急" value={stats.urgent} />
          <StatCard type="rate" label="已处理" value={stats.resolved} />
        </View>

        <ScrollView scrollX className={styles.filterBar}>
          {FILTER_OPTIONS.map(opt => (
            <View
              key={opt.key}
              className={classnames(
                styles.filterItem,
                activeFilter === opt.key && styles.filterActive
              )}
              onClick={() => handleFilterClick(opt.key)}
            >
              <Text>{opt.label}</Text>
            </View>
          ))}
        </ScrollView>

        <View className={styles.alertList}>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <View className={styles.empty}>
              <View className={styles.emptyIcon}>📋</View>
              <Text className={styles.emptyText}>暂无符合条件的告警</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MessagesPage;
