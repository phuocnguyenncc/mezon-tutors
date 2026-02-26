import { useToastController } from '@mezon-tutors/app/ui';

/**
 * useAppToast is a standardized wrapper around the UI toast system.
 * It provides simplified methods for common success and error notifications.
 */
export function useAppToast() {
  const toast = useToastController();

  return {
    show: (title: string, message?: string) => {
      toast.show(title, { message });
    },
    success: (title: string, message?: string) => {
      toast.show(title, {
        message,
        type: 'success', // Assuming the toast component can handle types or styles accordingly
      });
    },
    error: (title: string, message?: string) => {
      toast.show(title, {
        message,
        type: 'error',
      });
    },
    hide: () => {
      toast.hide();
    },
  };
}
