import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { WhitelistItem, AREA_OPTIONS } from '@/types';
import { mockWhitelist } from '@/data/duty';
import { formatDateTime, formatTime } from '@/utils';
import styles from './index.module.scss';

interface FormData {
  name: string;
  patientName: string;
  area: string;
  reason: string;
  validHours: string;
}

const WhitelistPage: React.FC = () => {
  const [list, setList] = useState<WhitelistItem[]>(mockWhitelist);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: '',
    patientName: '',
    area: '',
    reason: '',
    validHours: '2'
  });

  useEffect(() => {
    console.log('[Whitelist] 白名单管理页面加载，条目数:', list.length);
  }, []);

  const isExpired = (item: WhitelistItem): boolean => {
    return new Date(item.validUntil) < new Date();
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ name: '', patientName: '', area: '', reason: '', validHours: '2' });
    setShowModal(true);
  };

  const handleEdit = (item: WhitelistItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      patientName: item.patientName,
      area: item.area,
      reason: item.reason,
      validHours: '2'
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除该白名单条目吗？',
      success: (res) => {
        if (res.confirm) {
          setList(prev => prev.filter(i => i.id !== id));
          Taro.showToast({ title: '已删除', icon: 'success' });
          console.log('[Whitelist] 删除白名单:', id);
        }
      }
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      Taro.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }
    if (!form.patientName.trim()) {
      Taro.showToast({ title: '请输入患者姓名', icon: 'none' });
      return;
    }
    if (!form.area) {
      Taro.showToast({ title: '请选择区域', icon: 'none' });
      return;
    }

    const now = new Date();
    const hours = parseInt(form.validHours) || 2;
    const validUntil = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

    if (editingId) {
      setList(prev => prev.map(item =>
        item.id === editingId
          ? { ...item, ...form, validUntil }
          : item
      ));
      Taro.showToast({ title: '修改成功', icon: 'success' });
      console.log('[Whitelist] 修改白名单:', editingId);
    } else {
      const newItem: WhitelistItem = {
        id: `W${Date.now()}`,
        name: form.name,
        patientName: form.patientName,
        area: form.area,
        reason: form.reason,
        validFrom: now.toISOString(),
        validUntil,
        operator: '当前护士'
      };
      setList(prev => [newItem, ...prev]);
      Taro.showToast({ title: '添加成功', icon: 'success' });
      console.log('[Whitelist] 新增白名单:', newItem.id);
    }

    setShowModal(false);
  };

  const handleAreaSelect = () => {
    Taro.showActionSheet({
      itemList: AREA_OPTIONS.map(o => o.label),
      success: (res) => {
        setForm(prev => ({ ...prev, area: AREA_OPTIONS[res.tapIndex].label }));
      }
    });
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.header}>
          <Text className={styles.title}>白名单管理</Text>
          <Text className={styles.subtitle}>设置短时白名单，避免重复告警</Text>
        </View>

        <View className={styles.card}>
          {list.length > 0 ? (
            <View>
              {list.map(item => (
                <View key={item.id} className={styles.listItem}>
                  <View className={styles.itemHeader}>
                    <Text className={styles.itemName}>{item.name}</Text>
                    <View className={styles.itemTags}>
                      <View className={classnames(
                        styles.statusTag,
                        isExpired(item) ? styles.statusExpired : styles.statusActive
                      )}>
                        <Text>{isExpired(item) ? '已过期' : '生效中'}</Text>
                      </View>
                    </View>
                  </View>

                  <View className={styles.itemInfo}>
                    <View className={styles.infoRow}>
                      <Text className={styles.infoLabel}>对应患者</Text>
                      <Text className={styles.infoValue}>{item.patientName}</Text>
                    </View>
                    <View className={styles.infoRow}>
                      <Text className={styles.infoLabel}>放行区域</Text>
                      <Text className={styles.infoValue}>{item.area}</Text>
                    </View>
                    <View className={styles.infoRow}>
                      <Text className={styles.infoLabel}>有效期</Text>
                      <Text className={styles.infoValue}>
                        {formatTime(item.validFrom)} - {formatTime(item.validUntil)}
                      </Text>
                    </View>
                    <View className={styles.infoRow}>
                      <Text className={styles.infoLabel}>设置原因</Text>
                      <Text className={styles.infoValue}>{item.reason}</Text>
                    </View>
                    <View className={styles.infoRow}>
                      <Text className={styles.infoLabel}>操作人</Text>
                      <Text className={styles.infoValue}>{item.operator} · {formatDateTime(item.validFrom)}</Text>
                    </View>
                  </View>

                  <View className={styles.itemActions}>
                    <Button
                      className={classnames(styles.actionBtn, styles.btnEdit)}
                      onClick={() => handleEdit(item)}
                    >
                      <Text>编辑</Text>
                    </Button>
                    <Button
                      className={classnames(styles.actionBtn, styles.btnDelete)}
                      onClick={() => handleDelete(item.id)}
                    >
                      <Text>删除</Text>
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.empty}>
              <View className={styles.emptyIcon}>📋</View>
              <Text className={styles.emptyText}>暂无白名单</Text>
              <Text className={styles.emptyDesc}>点击下方按钮添加短时白名单</Text>
            </View>
          )}
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.addBtn} onClick={handleAdd}>
          <Text>+ 新增白名单</Text>
        </Button>
      </View>

      {showModal && (
        <View className={styles.modalMask} onClick={handleClose}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <View className={styles.modalHeader}>
              <Text className={styles.modalTitle}>{editingId ? '编辑白名单' : '新增白名单'}</Text>
              <Text className={styles.modalClose} onClick={handleClose}>×</Text>
            </View>

            <View className={styles.formSection}>
              <Text className={classnames(styles.formLabel, styles.formLabelRequired)}>家属姓名</Text>
              <View className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  placeholder="请输入家属姓名"
                  value={form.name}
                  onInput={(e) => setForm(prev => ({ ...prev, name: e.detail.value }))}
                />
              </View>
            </View>

            <View className={styles.formSection}>
              <Text className={classnames(styles.formLabel, styles.formLabelRequired)}>患者姓名</Text>
              <View className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  placeholder="请输入对应患者姓名"
                  value={form.patientName}
                  onInput={(e) => setForm(prev => ({ ...prev, patientName: e.detail.value }))}
                />
              </View>
            </View>

            <View className={styles.formSection}>
              <Text className={classnames(styles.formLabel, styles.formLabelRequired)}>放行区域</Text>
              <View className={styles.inputWrapper} onClick={handleAreaSelect}>
                <Input
                  className={styles.input}
                  placeholder="请选择放行区域"
                  value={form.area}
                  disabled
                />
              </View>
            </View>

            <View className={styles.formSection}>
              <Text className={styles.formLabel}>有效时长（小时）</Text>
              <View className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  type="number"
                  placeholder="请输入有效时长"
                  value={form.validHours}
                  onInput={(e) => setForm(prev => ({ ...prev, validHours: e.detail.value }))}
                />
              </View>
            </View>

            <View className={styles.formSection}>
              <Text className={styles.formLabel}>设置原因</Text>
              <View className={styles.textareaWrapper}>
                <Textarea
                  className={styles.textarea}
                  placeholder="请输入设置原因，如：术后家属等待、特殊情况等"
                  value={form.reason}
                  onInput={(e) => setForm(prev => ({ ...prev, reason: e.detail.value }))}
                  maxlength={200}
                />
              </View>
            </View>

            <View className={styles.modalActions}>
              <Button className={classnames(styles.modalBtn, styles.modalCancel)} onClick={handleClose}>
                <Text>取消</Text>
              </Button>
              <Button className={classnames(styles.modalBtn, styles.modalConfirm)} onClick={handleSubmit}>
                <Text>确认提交</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default WhitelistPage;
