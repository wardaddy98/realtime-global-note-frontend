import { notification } from 'antd';
import { NotificationConfig } from 'antd/es/notification/interface';

interface NConfig extends NotificationConfig {
  duration?: number;
}

export const useToast = () => {
  const notificationConfig: NConfig = {
    placement: 'topRight',
    duration: 3,
  };

  const errorToast = (message = 'Unexpected error occurred') => {
    notification.error({
      ...notificationConfig,
      message,
    });
  };

  const successToast = (message: string) => {
    notification.success({
      ...notificationConfig,
      message,
    });
  };
  const warningToast = (message: string) => {
    notification.warning({
      ...notificationConfig,
      message,
    });
  };
  const infoToast = (message: string) => {
    notification.info({
      ...notificationConfig,
      message,
    });
  };

  return {
    errorToast,
    infoToast,
    successToast,
    warningToast,
  };
};
