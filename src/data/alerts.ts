import { AlertItem } from '@/types';

const now = new Date();

const minusMinutes = (min: number): string => {
  const d = new Date(now.getTime() - min * 60 * 1000);
  return d.toISOString();
};

export const mockAlerts: AlertItem[] = [
  {
    id: 'A001',
    area: '新生儿病区门口',
    areaId: 'nicu_gate',
    level: 'urgent',
    scene: 'stranger',
    sceneLabel: '陌生人停留',
    occurTime: minusMinutes(15),
    duration: 15,
    snapshotUrl: 'https://picsum.photos/id/1036/600/400',
    description: '发现未登记人员在新生儿病区门口徘徊超过15分钟，未探视登记',
    status: 'pending',
    affectOrder: false,
    isWhitelisted: false,
    handleLogs: []
  },
  {
    id: 'A002',
    area: '手术等候区',
    areaId: 'op_waiting',
    level: 'warning',
    scene: 'family_wait',
    sceneLabel: '家属等待',
    occurTime: minusMinutes(85),
    duration: 85,
    snapshotUrl: 'https://picsum.photos/id/1082/600/400',
    description: '手术等候区3号家属组等待时间超过1小时，可能情绪焦虑',
    status: 'processing',
    handler: '张护士',
    remark: '已安抚，手术进展顺利，预计再等30分钟',
    affectOrder: false,
    isWhitelisted: false,
    handleLogs: [
      {
        id: 'L001',
        operator: '张护士',
        role: '责任护士',
        action: '备注说明',
        time: minusMinutes(20),
        content: '已安抚，手术进展顺利，预计再等30分钟'
      }
    ]
  },
  {
    id: 'A003',
    area: '输液大厅',
    areaId: 'infusion_hall',
    level: 'warning',
    scene: 'companion_gather',
    sceneLabel: '陪护聚集',
    occurTime: minusMinutes(45),
    duration: 45,
    snapshotUrl: 'https://picsum.photos/id/1080/600/400',
    description: '输液大厅B区有5名陪护人员聚集聊天，影响通行',
    status: 'pending',
    affectOrder: true,
    isWhitelisted: false,
    handleLogs: []
  },
  {
    id: 'A004',
    area: 'VIP病区访客区',
    areaId: 'vip_visitor',
    level: 'normal',
    scene: 'visit_timeout',
    sceneLabel: '探视超时',
    occurTime: minusMinutes(25),
    duration: 25,
    snapshotUrl: 'https://picsum.photos/id/1080/600/400',
    description: 'VIP病区502房探视时间已结束，访客仍未离开',
    status: 'resolved',
    handler: '李护士',
    allowUntil: minusMinutes(-5),
    affectOrder: false,
    isWhitelisted: false,
    handleLogs: [
      {
        id: 'L002',
        operator: '李护士',
        role: '责任护士',
        action: '允许等待至',
        time: minusMinutes(10),
        content: '允许等待至 17:30'
      },
      {
        id: 'L003',
        operator: '李护士',
        role: '责任护士',
        action: '标记已处理',
        time: minusMinutes(5),
        content: '访客已离开'
      }
    ]
  },
  {
    id: 'A005',
    area: '3楼病区门口',
    areaId: 'ward_gate_3f',
    level: 'urgent',
    scene: 'stranger',
    sceneLabel: '陌生人停留',
    occurTime: minusMinutes(35),
    duration: 35,
    snapshotUrl: 'https://picsum.photos/id/1062/600/400',
    description: '3楼病区门口发现陌生男子，声称找医生但无法提供患者信息',
    status: 'processing',
    handler: '安保王队长',
    affectOrder: true,
    isWhitelisted: false,
    handleLogs: [
      {
        id: 'L004',
        operator: '王护士',
        role: '护士站',
        action: '通知安保',
        time: minusMinutes(25),
        content: '已通知安保队到场'
      }
    ]
  },
  {
    id: 'A006',
    area: '5楼病区门口',
    areaId: 'ward_gate_5f',
    level: 'normal',
    scene: 'family_wait',
    sceneLabel: '家属等待',
    occurTime: minusMinutes(50),
    duration: 50,
    snapshotUrl: 'https://picsum.photos/id/177/600/400',
    description: '5楼病区门口家属等待患者检查结果',
    status: 'pending',
    affectOrder: false,
    isWhitelisted: true,
    handleLogs: []
  },
  {
    id: 'A007',
    area: '输液大厅',
    areaId: 'infusion_hall',
    level: 'normal',
    scene: 'visit_timeout',
    sceneLabel: '探视超时',
    occurTime: minusMinutes(120),
    duration: 120,
    snapshotUrl: 'https://picsum.photos/id/292/600/400',
    description: '输液大厅A区探视超时，家属未离开',
    status: 'resolved',
    handler: '陈护士',
    affectOrder: false,
    isWhitelisted: false,
    handleLogs: [
      {
        id: 'L005',
        operator: '陈护士',
        role: '导诊台',
        action: '转派疏导',
        time: minusMinutes(60),
        content: '已转派导诊台疏导'
      },
      {
        id: 'L006',
        operator: '陈护士',
        role: '导诊台',
        action: '标记已处理',
        time: minusMinutes(30),
        content: '家属已离开'
      }
    ]
  },
  {
    id: 'A008',
    area: '手术等候区',
    areaId: 'op_waiting',
    level: 'warning',
    scene: 'companion_gather',
    sceneLabel: '陪护聚集',
    occurTime: minusMinutes(8),
    duration: 8,
    snapshotUrl: 'https://picsum.photos/id/237/600/400',
    description: '手术等候区入口有6名家属聚集等待，阻碍通道',
    status: 'pending',
    affectOrder: true,
    isWhitelisted: false,
    handleLogs: []
  },
  {
    id: 'A009',
    area: 'VIP病区访客区',
    areaId: 'vip_visitor',
    level: 'normal',
    scene: 'family_wait',
    sceneLabel: '家属等待',
    occurTime: minusMinutes(180),
    duration: 180,
    snapshotUrl: 'https://picsum.photos/id/1025/600/400',
    description: 'VIP区801房术后家属等待恢复室观察结果',
    status: 'resolved',
    handler: '赵护士',
    allowUntil: minusMinutes(-30),
    affectOrder: false,
    isWhitelisted: true,
    handleLogs: [
      {
        id: 'L007',
        operator: '赵护士',
        role: '责任护士',
        action: '设置白名单',
        time: minusMinutes(120),
        content: '特殊患者家属，短时白名单有效至 20:00'
      },
      {
        id: 'L008',
        operator: '赵护士',
        role: '责任护士',
        action: '标记已处理',
        time: minusMinutes(30),
        content: '患者已转回病房'
      }
    ]
  },
  {
    id: 'A010',
    area: '新生儿病区门口',
    areaId: 'nicu_gate',
    level: 'warning',
    scene: 'visit_timeout',
    sceneLabel: '探视超时',
    occurTime: minusMinutes(5),
    duration: 5,
    snapshotUrl: 'https://picsum.photos/id/659/600/400',
    description: '新生儿病区探视时间已过，2组家属仍在等候',
    status: 'pending',
    affectOrder: false,
    isWhitelisted: false,
    handleLogs: []
  }
];
