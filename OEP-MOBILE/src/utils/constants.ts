export const AUTH_TOKEN = 'mobile_auth_token';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TYPE = 'all';
export const DISABLE_DEV = process.env.NODE_ENV !== 'production';
export const DAY_FORMAT = 'YYYY-MM-DD';
export const CARD_TYPE = {
  TIME: ['time', 'time card'],
  DURATION: ['duration', 'duration card'],
};
export const CARD_STATUS = {
  VALID: 'VALID',
  EXPIRED: 'EXPIRED',
  DEPLETE: 'DEPLETE',
};

// the status of the schedule
export const SCHEDULE_STATUS = {
  NO_DO: ['NO_DO', 'primary', 'not started'],
  DOING: ['DOING', 'success', 'in class'],
  FINISH: ['FINISH', 'default', 'completed'],
  COMMENTED: ['COMMENTED', 'warning', 'commented'],
  CANCEL: ['CANCEL', 'danger', 'cancelled'],
};
