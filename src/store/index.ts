import { create } from 'zustand';
import { AlertItem, WhitelistItem, AlertLevel, AlertScene } from '@/types';
import { mockAlerts } from '@/data/alerts';
import { mockWhitelist } from '@/data/duty';

interface AppState {
  alerts: AlertItem[];
  whitelist: WhitelistItem[];

  addAlert: (alert: Omit<AlertItem, 'id' | 'occurTime' | 'duration' | 'snapshotUrl' | 'handleLogs' | 'status' | 'affectOrder' | 'isWhitelisted'> & {
    affectOrder: boolean;
    description?: string;
  }) => void;

  addRemark: (alertId: string, remark: string, operator: string) => void;

  notifySecurity: (alertId: string, operator: string) => void;

  dispatchGuide: (alertId: string, operator: string) => void;

  setWhitelistOnAlert: (alertId: string, operator: string) => void;

  markResolved: (alertId: string, operator: string) => void;

  setAllowUntil: (alertId: string, allowUntil: string, operator: string) => void;

  addWhitelistItem: (item: Omit<WhitelistItem, 'id' | 'validFrom' | 'operator'>) => void;

  updateWhitelistItem: (id: string, item: Partial<WhitelistItem>) => void;

  deleteWhitelistItem: (id: string) => void;
}

const generateId = (): string => {
  return 'A' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
};

const generateLog = (operator: string, role: string, action: string, content?: string) => ({
  id: 'L' + Date.now().toString(36).toUpperCase(),
  operator,
  role,
  action,
  time: new Date().toISOString(),
  content
});

const sceneLabelMap: Record<AlertScene, string> = {
  family_wait: '家属等待',
  visit_timeout: '探视超时',
  stranger: '陌生人停留',
  companion_gather: '陪护聚集'
};

const snapshotPreset = [
  'https://picsum.photos/id/1036/600/400',
  'https://picsum.photos/id/1082/600/400',
  'https://picsum.photos/id/1080/600/400',
  'https://picsum.photos/id/177/600/400',
  'https://picsum.photos/id/237/600/400',
  'https://picsum.photos/id/659/600/400'
];

export const useAppStore = create<AppState>((set, get) => ({
  alerts: [...mockAlerts],
  whitelist: [...mockWhitelist],

  addAlert: (data) => {
    console.log('[Store] addAlert:', data);
    const now = new Date().toISOString();
    const newAlert: AlertItem = {
      id: generateId(),
      area: data.area,
      areaId: data.areaId || '',
      level: data.level,
      scene: data.scene,
      sceneLabel: sceneLabelMap[data.scene] || data.scene,
      occurTime: now,
      duration: 0,
      snapshotUrl: snapshotPreset[Math.floor(Math.random() * snapshotPreset.length)],
      description: data.description || '临床护士协同上报',
      status: 'pending',
      handler: undefined,
      affectOrder: data.affectOrder,
      isWhitelisted: false,
      handleLogs: [
        generateLog(
          data.handler || '当前护士',
          '责任护士',
          '协同上报',
          data.description
        )
      ]
    };
    set((state) => ({ alerts: [newAlert, ...state.alerts] }));
  },

  addRemark: (alertId, remark, operator) => {
    console.log('[Store] addRemark:', alertId, remark);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              remark,
              status: a.status === 'pending' ? 'processing' : a.status,
              handler: a.handler || operator,
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '责任护士', '补充说明', remark)
              ]
            }
          : a
      )
    }));
  },

  notifySecurity: (alertId, operator) => {
    console.log('[Store] notifySecurity:', alertId);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: 'processing',
              handler: '安保队已指派',
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '护士站', '通知安保', '安保队已收到通知，正在赶往现场')
              ]
            }
          : a
      )
    }));
  },

  dispatchGuide: (alertId, operator) => {
    console.log('[Store] dispatchGuide:', alertId);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: 'processing',
              handler: a.handler ? `${a.handler} + 导诊台` : '导诊台',
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '护士站', '转派疏导', '已通知导诊台前往现场疏导')
              ]
            }
          : a
      )
    }));
  },

  setWhitelistOnAlert: (alertId, operator) => {
    console.log('[Store] setWhitelistOnAlert:', alertId);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              isWhitelisted: true,
              status: 'processing',
              handler: a.handler || operator,
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '责任护士', '设置白名单', '特殊情况，已加入短时白名单')
              ]
            }
          : a
      )
    }));
  },

  markResolved: (alertId, operator) => {
    console.log('[Store] markResolved:', alertId);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: 'resolved',
              handler: a.handler || operator,
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '责任护士', '标记已处理', '现场已处置，告警消除')
              ]
            }
          : a
      )
    }));
  },

  setAllowUntil: (alertId, allowUntil, operator) => {
    console.log('[Store] setAllowUntil:', alertId, allowUntil);
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              allowUntil,
              status: a.status === 'pending' ? 'processing' : a.status,
              handler: a.handler || operator,
              handleLogs: [
                ...a.handleLogs,
                generateLog(operator, '责任护士', '允许等待至', allowUntil)
              ]
            }
          : a
      )
    }));
  },

  addWhitelistItem: (item) => {
    console.log('[Store] addWhitelistItem:', item);
    const newItem: WhitelistItem = {
      ...item,
      id: 'W' + Date.now().toString(36).toUpperCase(),
      validFrom: new Date().toISOString(),
      operator: '当前护士'
    };
    set((state) => ({ whitelist: [newItem, ...state.whitelist] }));
  },

  updateWhitelistItem: (id, updates) => {
    console.log('[Store] updateWhitelistItem:', id, updates);
    set((state) => ({
      whitelist: state.whitelist.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      )
    }));
  },

  deleteWhitelistItem: (id) => {
    console.log('[Store] deleteWhitelistItem:', id);
    set((state) => ({
      whitelist: state.whitelist.filter((w) => w.id !== id)
    }));
  }
}));
