export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
};

export const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
};

export const formatDateTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${month}-${day} ${hh}:${mm}`;
};

export const getLevelLabel = (level: string): string => {
  const map: Record<string, string> = {
    urgent: '紧急',
    warning: '警告',
    normal: '普通'
  };
  return map[level] || level;
};

export const getStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已处理'
  };
  return map[status] || status;
};

export const getCurrentTimeStr = (): string => {
  return new Date().toISOString();
};

export const addMinutes = (baseTime: string, minutes: number): string => {
  const date = new Date(baseTime);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};
