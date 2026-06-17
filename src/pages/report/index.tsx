import React, { useState, useEffect } from 'react';
import { View, Text, Textarea, Switch, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { AREA_OPTIONS, SCENE_OPTIONS, AlertLevel } from '@/types';
import styles from './index.module.scss';

const LEVEL_OPTIONS = [
  { value: 'urgent', label: '紧急', colorClass: styles.optionUrgent },
  { value: 'warning', label: '警告', colorClass: styles.optionWarning },
  { value: 'normal', label: '普通', colorClass: '' }
];

type NotifyType = 'nurse' | 'security' | 'guide';

const ReportPage: React.FC = () => {
  const [area, setArea] = useState<string>('');
  const [scene, setScene] = useState<string>('');
  const [level, setLevel] = useState<AlertLevel>('normal');
  const [description, setDescription] = useState<string>('');
  const [affectOrder, setAffectOrder] = useState<boolean>(false);
  const [notifies, setNotifies] = useState<NotifyType[]>(['nurse']);

  useEffect(() => {
    console.log('[Report] 协同上报页面加载');
  }, []);

  const handleAreaClick = (value: string) => {
    setArea(value);
    console.log('[Report] 选择区域:', value);
  };

  const handleSceneClick = (value: string) => {
    setScene(value);
    console.log('[Report] 选择场景:', value);
  };

  const handleLevelClick = (value: AlertLevel) => {
    setLevel(value);
    console.log('[Report] 选择等级:', value);
  };

  const toggleNotify = (type: NotifyType) => {
    setNotifies(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleSubmit = () => {
    if (!area) {
      Taro.showToast({ title: '请选择区域', icon: 'none' });
      return;
    }
    if (!scene) {
      Taro.showToast({ title: '请选择场景', icon: 'none' });
      return;
    }
    console.log('[Report] 提交上报:', {
      area, scene, level, description, affectOrder, notifies
    });
    Taro.showLoading({ title: '提交中...' });
    setTimeout(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '上报成功', icon: 'success' });
      setArea('');
      setScene('');
      setLevel('normal');
      setDescription('');
      setAffectOrder(false);
      setNotifies(['nurse']);
    }, 800);
  };

  const handleReset = () => {
    setArea('');
    setScene('');
    setLevel('normal');
    setDescription('');
    setAffectOrder(false);
    setNotifies(['nurse']);
  };

  const getNotifyClass = (type: NotifyType): string => {
    const base = styles.notifyBtn;
    const active = notifies.includes(type) ? styles.notifyBtnActive : '';
    const typeClass = type === 'security' ? styles.notifySecurity
      : type === 'guide' ? styles.notifyGuide : '';
    return classnames(base, active, typeClass);
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.header}>
          <Text className={styles.title}>协同上报</Text>
          <Text className={styles.subtitle}>发现异常滞留？快速上报协同处理</Text>
        </View>

        <View className={styles.formCard}>
          <View className={styles.formSection}>
            <Text className={classnames(styles.formLabel, styles.formLabelRequired)}>
              发生区域
            </Text>
            <View className={styles.optionGrid}>
              {AREA_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={classnames(
                    styles.optionItem,
                    area === opt.value && styles.optionActive
                  )}
                  onClick={() => handleAreaClick(opt.value)}
                >
                  <Text>{opt.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={classnames(styles.formLabel, styles.formLabelRequired)}>
              场景类型
            </Text>
            <View className={styles.optionGrid}>
              {SCENE_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={classnames(
                    styles.optionItem,
                    scene === opt.value && styles.optionActive,
                    (opt.value === 'stranger' && styles.optionUrgent) ||
                    (opt.value === 'visit_timeout' && styles.optionWarning) ||
                    (opt.value === 'companion_gather' && styles.optionPurple)
                  )}
                  onClick={() => handleSceneClick(opt.value)}
                >
                  <Text>{opt.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.formLabel}>告警等级</Text>
            <View className={styles.optionGrid}>
              {LEVEL_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={classnames(
                    styles.optionItem,
                    level === opt.value && styles.optionActive,
                    opt.colorClass
                  )}
                  onClick={() => handleLevelClick(opt.value as AlertLevel)}
                >
                  <Text>{opt.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.formLabel}>情况描述</Text>
            <View className={styles.textareaWrapper}>
              <Textarea
                className={styles.textarea}
                placeholder="请输入现场情况描述（选填）"
                placeholderClass={styles.placeholder}
                value={description}
                onInput={(e) => setDescription(e.detail.value)}
                maxlength={200}
              />
            </View>
          </View>

          <View className={styles.formSection}>
            <View className={styles.switchRow}>
              <View>
                <Text className={styles.switchLabel}>是否影响护理秩序</Text>
                <View className={styles.switchDesc}>开启后将标记为需优先处理</View>
              </View>
              <Switch
                checked={affectOrder}
                onChange={(e) => setAffectOrder(e.detail.value)}
                color="#1677FF"
              />
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.formLabel}>通知协同方</Text>
            <View className={styles.notifyOptions}>
              <Button
                className={getNotifyClass('nurse')}
                onClick={() => toggleNotify('nurse')}
              >
                <Text>护士站</Text>
              </Button>
              <Button
                className={getNotifyClass('security')}
                onClick={() => toggleNotify('security')}
              >
                <Text>安保队</Text>
              </Button>
              <Button
                className={getNotifyClass('guide')}
                onClick={() => toggleNotify('guide')}
              >
                <Text>导诊台</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={classnames(styles.btn, styles.btnSecondary)} onClick={handleReset}>
          <Text>重置</Text>
        </Button>
        <Button className={classnames(styles.btn, styles.btnPrimary)} onClick={handleSubmit}>
          <Text>提交上报</Text>
        </Button>
      </View>
    </View>
  );
};

export default ReportPage;
