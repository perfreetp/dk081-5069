import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

type TagColor = 'primary' | 'urgent' | 'warning' | 'success' | 'cyan' | 'purple' | 'gray';

interface TagProps {
  color?: TagColor;
  text: string;
  size?: 'sm' | 'md';
  className?: string;
}

const colorMap: Record<TagColor, string> = {
  primary: styles.tagPrimary,
  urgent: styles.tagUrgent,
  warning: styles.tagWarning,
  success: styles.tagSuccess,
  cyan: styles.tagCyan,
  purple: styles.tagPurple,
  gray: styles.tagGray
};

const sizeMap: Record<string, string> = {
  sm: styles.tagSm,
  md: styles.tagMd
};

const Tag: React.FC<TagProps> = ({ color = 'primary', text, size = 'sm', className }) => {
  return (
    <View className={classnames(styles.tag, colorMap[color], sizeMap[size], className)}>
      <Text>{text}</Text>
    </View>
  );
};

export default Tag;
