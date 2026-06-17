import { DutyInfo, WhitelistItem, HandoverAlert } from '@/types';

const now = new Date();
const todayStr = now.toISOString().split('T')[0];

const addHours = (h: number): string => {
  return new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();
};

const minusHours = (h: number): string => {
  return new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
};

export const mockDutyInfo: DutyInfo = {
  date: todayStr,
  shift: 'afternoon',
  shiftLabel: '中班',
  nurseName: '王晓梅',
  nurseTitle: '主管护师',
  department: '普外科',
  onDutyTime: minusHours(3),
  nextShiftNurse: '李芳',
  nextShiftTime: addHours(5)
};

export const mockWhitelist: WhitelistItem[] = [
  {
    id: 'W001',
    name: '张建国',
    patientName: '张小明',
    area: 'VIP病区访客区',
    reason: '术后家属等待，已与护士长沟通',
    validFrom: minusHours(4),
    validUntil: addHours(2),
    operator: '赵护士'
  },
  {
    id: 'W002',
    name: '李慧',
    patientName: '王建国',
    area: '5楼病区门口',
    reason: '特殊患者家属，允许短时等待',
    validFrom: minusHours(1),
    validUntil: addHours(1),
    operator: '陈护士'
  },
  {
    id: 'W003',
    name: '王秀兰',
    patientName: '刘伟',
    area: '手术等候区',
    reason: '大手术家属，情绪需安抚',
    validFrom: minusHours(6),
    validUntil: addHours(1),
    operator: '张护士'
  }
];

export const mockHandoverAlerts: HandoverAlert[] = [
  {
    id: 'A001',
    area: '新生儿病区门口',
    scene: '陌生人停留',
    occurTime: minusHours(0.25),
    duration: 15,
    handler: '-'
  },
  {
    id: 'A003',
    area: '输液大厅',
    scene: '陪护聚集',
    occurTime: minusHours(0.75),
    duration: 45,
    handler: '-'
  },
  {
    id: 'A005',
    area: '3楼病区门口',
    scene: '陌生人停留',
    occurTime: minusHours(0.6),
    duration: 35,
    handler: '安保王队长'
  },
  {
    id: 'A008',
    area: '手术等候区',
    scene: '陪护聚集',
    occurTime: minusHours(0.15),
    duration: 8,
    handler: '-'
  },
  {
    id: 'A010',
    area: '新生儿病区门口',
    scene: '探视超时',
    occurTime: minusHours(0.1),
    duration: 5,
    handler: '-'
  }
];
