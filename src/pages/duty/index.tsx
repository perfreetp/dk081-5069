import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockDutyInfo, mockWhitelist, mockHandoverAlerts } from '@/data/duty';
import { formatDuration, formatTime, formatDateTime } from '@/utils';
import styles from './index.module.scss';

const DutyPage: React.FC = () => {
  const duty = mockDutyInfo;
  const whitelist = mockWhitelist;
  const handoverAlerts = mockHandoverAlerts;

  useEffect(() => {
    console.log('[Duty] 值班设置页面加载，值班护士:', duty.nurseName);
  }, []);

  const goWhitelist = () => {
    Taro.navigateTo({ url: '/pages/whitelist/index' });
  };

  const goAlertDetail = (id: string) => {
    Taro.navigateTo({ url: `/pages/alert-detail/index?id=${id}` });
  };

  const formatDateLabel = (dateStr: string): string => {
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${month}月${day}日`;
  };

  const getInitial = (name: string): string => {
    return name.charAt(0);
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.dutyCard}>
          <View className={styles.dutyHeader}>
            <Text className={styles.dutyShift}>{duty.shiftLabel}值班</Text>
            <Text className={styles.dutyDate}>{formatDateLabel(duty.date)}</Text>
          </View>

          <View className={styles.nurseInfo}>
            <View className={styles.avatar}>
              <Text>{getInitial(duty.nurseName)}</Text>
            </View>
            <View className={styles.nurseDetail}>
              <Text className={styles.nurseName}>{duty.nurseName}</Text>
              <Text className={styles.nurseDept}>{duty.department} · {duty.nurseTitle}</Text>
            </View>
          </View>

          <View className={styles.dutyTimes}>
            <View className={styles.timeItem}>
              <Text className={styles.timeValue}>{formatTime(duty.onDutyTime)}</Text>
              <Text className={styles.timeLabel}>上岗时间</Text>
            </View>
            <View className={styles.timeDivider} />
            <View className={styles.timeItem}>
              <Text className={styles.timeValue}>{formatTime(duty.nextShiftTime)}</Text>
              <Text className={styles.timeLabel}>接班时间</Text>
            </View>
            <View className={styles.timeDivider} />
            <View className={styles.timeItem}>
              <Text className={styles.timeValue}>{duty.nextShiftNurse}</Text>
              <Text className={styles.timeLabel}>接班护士</Text>
            </View>
          </View>
        </View>

        <View className={styles.card}>
          <View className={styles.sectionTitle}>
            <View className={styles.sectionTitleText}>
              <View className={styles.sectionTitleBar} />
              <Text>交接班未消除告警</Text>
              <View className={styles.alertBadge}>
                <Text>{handoverAlerts.length}</Text>
              </View>
            </View>
          </View>
          {handoverAlerts.length > 0 ? (
            <View className={styles.handoverList}>
              {handoverAlerts.map(alert => (
                <View
                  key={alert.id}
                  className={styles.handoverItem}
                  onClick={() => goAlertDetail(alert.id)}
                >
                  <View className={styles.handoverDot} />
                  <View className={styles.handoverContent}>
                    <View className={styles.handoverArea}>
                      <Text>{alert.area}</Text>
                      <View className={styles.handoverScene}>
                        <Text>{alert.scene}</Text>
                      </View>
                    </View>
                    <View className={styles.handoverMeta}>
                      <Text>{formatDateTime(alert.occurTime)} 发生</Text>
                      <Text>·</Text>
                      <Text>已滞留 {formatDuration(alert.duration)}</Text>
                      <Text>·</Text>
                      <Text>处理人: {alert.handler}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyText}>暂无未消除告警，交接顺利 👍</Text>
            </View>
          )}
        </View>

        <View className={styles.card}>
          <View className={styles.sectionTitle}>
            <View className={styles.sectionTitleText}>
              <View className={styles.sectionTitleBar} />
              <Text>短时白名单</Text>
            </View>
            <Text className={styles.sectionExtra} onClick={goWhitelist}>
              管理 ›
            </Text>
          </View>
          {whitelist.length > 0 ? (
            <View>
              {whitelist.slice(0, 3).map(item => (
                <View key={item.id} className={styles.whitelistItem}>
                  <View className={styles.whitelistHeader}>
                    <Text className={styles.whitelistName}>{item.name}</Text>
                    <View className={styles.whitelistTag}>
                      <Text>生效中</Text>
                    </View>
                  </View>
                  <Text className={styles.whitelistInfo}>
                    患者: {item.patientName} · {item.area}
                  </Text>
                  <Text className={styles.whitelistValid}>
                    有效期: {formatTime(item.validFrom)} - {formatTime(item.validUntil)} · {item.reason}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyText}>暂无白名单设置</Text>
            </View>
          )}
        </View>

        <View className={styles.card}>
          <View className={styles.sectionTitle}>
            <View className={styles.sectionTitleText}>
              <View className={styles.sectionTitleBar} />
              <Text>更多设置</Text>
            </View>
          </View>
          <View className={styles.menuList}>
            <View className={styles.menuItem} onClick={goWhitelist}>
              <View className={styles.menuLeft}>
                <View className={styles.menuIcon}>📋</View>
                <Text className={styles.menuText}>白名单管理</Text>
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem}>
              <View className={styles.menuLeft}>
                <View className={styles.menuIcon}>🔔</View>
                <Text className={styles.menuText}>告警通知设置</Text>
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem}>
              <View className={styles.menuLeft}>
                <View className={styles.menuIcon}>📊</View>
                <Text className={styles.menuText}>历史记录统计</Text>
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
            <View className={styles.menuItem}>
              <View className={styles.menuLeft}>
                <View className={styles.menuIcon}>⚙️</View>
                <Text className={styles.menuText}>系统设置</Text>
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DutyPage;
