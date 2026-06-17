import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

type StatType = 'total' | 'unresolved' | 'urgent' | 'rate';

interface StatCardProps {
  type: StatType;
  label: string;
  value: number | string;
  unit?: string;
  className?: string;
}

const typeMap: Record<StatType, string> = {
  total: styles.statTotal,
  unresolved: styles.statUnresolved,
  urgent: styles.statUrgent,
  rate: styles.statRate
};

const StatCard: React.FC<StatCardProps> = ({ type, label, value, unit, className }) => {
  return (
    <View className={classnames(styles.statCard, typeMap[type], className)}>
      <View className={styles.statValue}>
        <Text className={styles.statValueText}>{value}</Text>
        {unit && <Text className={styles.statUnit}>{unit}</Text>}
      </View>
      <Text className={styles.statLabel}>{label}</Text>
    </View>
  );
};

export default StatCard;
