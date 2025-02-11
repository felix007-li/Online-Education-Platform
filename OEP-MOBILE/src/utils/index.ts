import { Toast } from 'antd-mobile';

export const showSuccess = (content: string) => {
  Toast.show({
    content,
    icon: 'success',
  });
};

export const showFail = ({ code, message }: { code: number, message: string }) => {
  Toast.show({
    content: `${code}：${message}`,
    icon: 'fail',
  });
};

export const getWeekZh = (day: string) => {
  const weekMap: Record<string, string> = {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
  };

  return weekMap[day];
};
