import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import Tag from '@/components/Tag';
import { AlertItem, AlertLevel, AlertScene } from '@/types';
import { mockAlerts } from '@/data/alerts';
import { formatDuration, formatTime, formatDateTime, getLevelLabel } from '@/utils';
import styles from './index.module.scss';

const getLevelColor = (level: AlertLevel): 'urgent' | 'warning' | 'primary' => {
  if (level === 'urgent') return 'urgent';
  if (level === 'warning') return 'warning';
  return 'primary';
};

const getSceneColor = (scene: AlertScene): 'primary' | 'warning' | 'urgent' | 'purple' => {
  const map: Record<AlertScene, 'primary' | 'warning' | 'urgent' | 'purple'> = {
    family_wait: 'primary',
    visit_timeout: 'warning',
    stranger: 'urgent',
    companion_gather: 'purple'
  };
  return map[scene];
};

const AlertDetailPage: React.FC = () => {
  const router = useRouter();
  const alertId = router.params.id || mockAlerts[0].id;
  const [alert, setAlert] = useState<AlertItem | null>(null);

  useEffect(() => {
    const found = mockAlerts.find(a => a.id === alertId) || mockAlerts[0];
    setAlert(found);
    console.log('[AlertDetail] 加载告警详情:', found?.id);
  }, [alertId]);

  const statusClass = useMemo(() => {
    if (!alert) return '';
    if (alert.status === 'pending') return styles.statusPending;
    if (alert.status === 'processing') return styles.statusProcessing;
    return styles.statusResolved;
  }, [alert]);

  const statusLabel = useMemo(() => {
    if (!alert) return '';
    if (alert.status === 'pending') return '待处理';
    if (alert.status === 'processing') return '处理中';
    return '已处理';
  }, [alert]);

  const handleNotifySecurity = () => {
    console.log('[AlertDetail] 通知安保');
    Taro.showToast({ title: '已通知安保队', icon: 'success' });
  };

  const handleAddRemark = () => {
    console.log('[AlertDetail] 补充说明');
    Taro.showModal({
      title: '补充临时说明',
      editable: true,
      placeholderText: '例如：已安抚，允许等待至17:30',
      success: (res) => {
        if (res.confirm && res.content) {
          Taro.showToast({ title: '已添加说明', icon: 'success' });
        }
      }
    });
  };

  const handleDispatchGuide = () => {
    console.log('[AlertDetail] 转派导诊台');
    Taro.showToast({ title: '已转派导诊台疏导', icon: 'success' });
  };

  const handleSetWhitelist = () => {
    console.log('[AlertDetail] 设置白名单');
    Taro.navigateTo({ url: '/pages/whitelist/index?from=alert' });
  };

  const handleMarkResolved = () => {
    console.log('[AlertDetail] 标记已处理');
    Taro.showToast({ title: '已标记处理完成', icon: 'success' });
    setTimeout(() => Taro.navigateBack(), 800);
  };

  if (!alert) {
    return (
      <View className={styles.page}>
        <View className={styles.empty}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <View className={styles.snapshot}>
        <Image
          className={styles.snapshotImg}
          src={alert.snapshotUrl}
          mode="aspectFill"
        />
      </View>

      <View className={styles.container}>
        <View className={styles.headerCard}>
          <View className={styles.headerTop}>
            <View className={styles.areaInfo}>
              <Text className={styles.areaName}>{alert.area}</Text>
              <View className={styles.tagsRow}>
                <Tag color={getLevelColor(alert.level)} text={getLevelLabel(alert.level)} size="md" />
                <Tag color={getSceneColor(alert.scene)} text={alert.sceneLabel} size="md" />
                {alert.isWhitelisted && <Tag color="success" text="白名单" size="md" />}
                {alert.affectOrder && <Tag color="urgent" text="影响秩序" size="md" />}
              </View>
            </View>
            <View className={classnames(styles.statusBadge, statusClass)}>
              <Text>{statusLabel}</Text>
            </View>
          </View>

          <View className={styles.infoGrid}>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>发生时间</Text>
              <Text className={styles.infoValue}>{formatDateTime(alert.occurTime)}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>滞留时长</Text>
              <Text className={styles.infoValue}>{formatDuration(alert.duration)}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>处理人</Text>
              <Text className={styles.infoValue}>{alert.handler || '暂未分配'}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>告警编号</Text>
              <Text className={styles.infoValue}>{alert.id}</Text>
            </View>
          </View>
        </View>

        <View className={styles.card}>
          <View className={styles.sectionTitle}>
            <View className={styles.sectionTitleBar} />
            <Text>情况描述</Text>
          </View>
          <Text className={styles.descText}>{alert.description}</Text>
          {alert.remark && (
            <View className={styles.remarkBox}>
              <Text className={styles.remarkLabel}>临时说明</Text>
              <Text className={styles.remarkText}>{alert.remark}</Text>
            </View>
          )}
          {alert.allowUntil && (
            <View className={styles.remarkBox}>
              <Text className={styles.remarkLabel}>允许等待至</Text>
              <Text className={styles.remarkText}>{formatTime(alert.allowUntil)}</Text>
            </View>
          )}
        </View>

        <View className={styles.card}>
          <View className={styles.sectionTitle}>
            <View className={styles.sectionTitleBar} />
            <Text>处理记录</Text>
          </View>
          {alert.handleLogs.length > 0 ? (
            <View className={styles.logList}>
              {alert.handleLogs.map(log => (
                <View key={log.id} className={styles.logItem}>
                  <View className={styles.logDot} />
                  <View className={styles.logContent}>
                    <View className={styles.logHeader}>
                      <Text className={styles.logOperator}>{log.operator}</Text>
                      <Text className={styles.logTime}>{formatDateTime(log.time)}</Text>
                    </View>
                    <Text className={styles.logAction}>{log.role} · {log.action}</Text>
                    {log.content && <Text className={styles.logDetail}>{log.content}</Text>}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.empty}>
              <Text className={styles.remarkText}>暂无处理记录</Text>
            </View>
          )}
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button
          className={classnames(styles.actionBtn, styles.btnOutline)}
          onClick={handleAddRemark}
        >
          <Text>补充说明</Text>
        </Button>
        <Button
          className={classnames(styles.actionBtn, styles.btnOutline)}
          onClick={handleSetWhitelist}
        >
          <Text>设白名单</Text>
        </Button>
        <Button
          className={classnames(styles.actionBtn, styles.btnGuide)}
          onClick={handleDispatchGuide}
        >
          <Text>转派导诊</Text>
        </Button>
        <Button
          className={classnames(styles.actionBtn, styles.btnSecurity)}
          onClick={handleNotifySecurity}
        >
          <Text>通知安保</Text>
        </Button>
        <Button
          className={classnames(styles.actionBtn, styles.btnPrimary)}
          onClick={handleMarkResolved}
        >
          <Text>标记已处理</Text>
        </Button>
      </View>
    </View>
  );
};

export default AlertDetailPage;
