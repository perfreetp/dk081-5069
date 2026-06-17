export type AlertLevel = 'urgent' | 'warning' | 'normal';

export type AlertScene = 'family_wait' | 'visit_timeout' | 'stranger' | 'companion_gather';

export type AlertStatus = 'pending' | 'processing' | 'resolved';

export interface AlertItem {
  id: string;
  area: string;
  areaId: string;
  level: AlertLevel;
  scene: AlertScene;
  sceneLabel: string;
  occurTime: string;
  duration: number;
  snapshotUrl: string;
  description: string;
  status: AlertStatus;
  handler?: string;
  remark?: string;
  allowUntil?: string;
  affectOrder: boolean;
  isWhitelisted: boolean;
  handleLogs: HandleLog[];
}

export interface HandleLog {
  id: string;
  operator: string;
  role: string;
  action: string;
  time: string;
  content?: string;
}

export interface AreaStat {
  id: string;
  name: string;
  todayCount: number;
  urgentCount: number;
  unresolvedCount: number;
  trend: 'up' | 'down' | 'flat';
}

export interface TimeSlotStat {
  hour: string;
  count: number;
}

export interface HotPointRank {
  id: string;
  name: string;
  count: number;
  rate: number;
}

export interface WhitelistItem {
  id: string;
  name: string;
  idCard?: string;
  patientName: string;
  area: string;
  reason: string;
  validFrom: string;
  validUntil: string;
  operator: string;
}

export interface DutyInfo {
  date: string;
  shift: 'morning' | 'afternoon' | 'night';
  shiftLabel: string;
  nurseName: string;
  nurseTitle: string;
  department: string;
  onDutyTime: string;
  nextShiftNurse: string;
  nextShiftTime: string;
}

export interface HandoverAlert {
  id: string;
  area: string;
  scene: string;
  occurTime: string;
  duration: number;
  handler: string;
}

export type SceneOption = {
  value: AlertScene;
  label: string;
  color: string;
};

export const SCENE_OPTIONS: SceneOption[] = [
  { value: 'family_wait', label: '家属等待', color: '#1677FF' },
  { value: 'visit_timeout', label: '探视超时', color: '#FA8C16' },
  { value: 'stranger', label: '陌生人停留', color: '#FF4D4F' },
  { value: 'companion_gather', label: '陪护聚集', color: '#722ED1' }
];

export const AREA_OPTIONS = [
  { value: 'nicu_gate', label: '新生儿病区门口' },
  { value: 'op_waiting', label: '手术等候区' },
  { value: 'infusion_hall', label: '输液大厅' },
  { value: 'vip_visitor', label: 'VIP病区访客区' },
  { value: 'ward_gate_3f', label: '3楼病区门口' },
  { value: 'ward_gate_5f', label: '5楼病区门口' }
];
