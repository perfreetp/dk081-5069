import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import Tag from '@/components/Tag';
import { AlertItem, AlertLevel, AlertScene } from '@/types';
import { formatDuration, formatTime } from '@/utils';
import styles from './index.module.scss';

interface AlertCardProps {
  alert: AlertItem;
  onClick?: () => void;
}

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

const getStatusColor = (status: string): 'success' | 'warning' | 'gray' => {
  if (status === 'resolved') return 'success';
  if (status === 'processing') return 'warning';
  return 'gray';
};

const getStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已处理'
  };
  return map[status] || status;
};

const AlertCard: React.FC<AlertCardProps> = ({ alert, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/alert-detail/index?id=${alert.id}`
      });
    }
  };

  return (
    <View
      className={classnames(
        styles.card,
        alert.level === 'urgent' && styles.cardUrgent
      )}
      onClick={handleClick}
    >
      <View className={styles.cardHeader}>
        <View className={styles.leftTags}>
          <Tag color={getLevelColor(alert.level)} text={alert.level === 'urgent' ? '紧急' : alert.level === 'warning' ? '警告' : '普通'} />
          <View className={styles.tagSpace} />
          <Tag color={getSceneColor(alert.scene)} text={alert.sceneLabel} />
          {alert.isWhitelisted && (
            <>
              <View className={styles.tagSpace} />
              <Tag color="success" text="白名单" />
            </>
          )}
          {alert.affectOrder && (
            <>
              <View className={styles.tagSpace} />
              <Tag color="urgent" text="影响秩序" />
            </>
          )}
        </View>
        <Tag color={getStatusColor(alert.status)} text={getStatusLabel(alert.status)} size="sm" />
      </View>

      <View className={styles.cardBody}>
        <Image
          className={styles.snapshot}
          src={alert.snapshotUrl}
          mode="aspectFill"
        />
        <View className={styles.content}>
          <Text className={styles.area}>{alert.area}</Text>
          <Text className={styles.description}>{alert.description}</Text>
          <View className={styles.meta}>
            <Text className={styles.metaItem}>
              {formatTime(alert.occurTime)} 发生
            </Text>
            <Text className={styles.metaDot}>·</Text>
            <Text className={styles.metaItem}>
              已滞留 {formatDuration(alert.duration)}
            </Text>
          </View>
          {alert.handler && (
            <View className={styles.handlerRow}>
              <Text className={styles.handlerLabel}>处理人：</Text>
              <Text className={styles.handlerName}>{alert.handler}</Text>
            </View>
          )}
          {alert.remark && (
            <View className={styles.remarkRow}>
              <Text className={styles.remarkLabel}>备注：</Text>
              <Text className={styles.remarkText}>{alert.remark}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AlertCard;
