import { AreaStat, TimeSlotStat, HotPointRank } from '@/types';

export const mockAreaStats: AreaStat[] = [
  { id: '1', name: '新生儿病区门口', todayCount: 12, urgentCount: 3, unresolvedCount: 2, trend: 'up' },
  { id: '2', name: '手术等候区', todayCount: 18, urgentCount: 2, unresolvedCount: 2, trend: 'flat' },
  { id: '3', name: '输液大厅', todayCount: 15, urgentCount: 1, unresolvedCount: 1, trend: 'down' },
  { id: '4', name: 'VIP病区访客区', todayCount: 8, urgentCount: 0, unresolvedCount: 0, trend: 'flat' },
  { id: '5', name: '3楼病区门口', todayCount: 6, urgentCount: 1, unresolvedCount: 1, trend: 'up' },
  { id: '6', name: '5楼病区门口', todayCount: 4, urgentCount: 0, unresolvedCount: 1, trend: 'down' }
];

export const mockTimeSlotStats: TimeSlotStat[] = [
  { hour: '08', count: 2 },
  { hour: '09', count: 5 },
  { hour: '10', count: 8 },
  { hour: '11', count: 12 },
  { hour: '12', count: 6 },
  { hour: '13', count: 4 },
  { hour: '14', count: 7 },
  { hour: '15', count: 10 },
  { hour: '16', count: 14 },
  { hour: '17', count: 9 },
  { hour: '18', count: 5 },
  { hour: '19', count: 3 }
];

export const mockHotPointRanks: HotPointRank[] = [
  { id: '1', name: '手术等候区', count: 18, rate: 100 },
  { id: '2', name: '新生儿病区门口', count: 12, rate: 67 },
  { id: '3', name: '输液大厅', count: 15, rate: 83 },
  { id: '4', name: 'VIP病区访客区', count: 8, rate: 44 },
  { id: '5', name: '3楼病区门口', count: 6, rate: 33 }
];

export const mockOverviewStats = {
  todayTotal: 63,
  unresolved: 7,
  urgent: 7,
  resolvedRate: 89
};
