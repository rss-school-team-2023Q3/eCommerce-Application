import { toast } from 'react-toastify';

export const toastError = (message: string) => toast.error(message, {
  pauseOnFocusLoss: false,
  autoClose: 1500,
});

export const toastWarning = (message: string) => toast.warn(message, {
  pauseOnFocusLoss: false,
  autoClose: 1500,
});

export const toastSuccess = (message: string) => toast.success(message, {
  pauseOnFocusLoss: false,
  autoClose: 1500,
});

export const toastInfo = (message: string) => toast.info(message, {
  pauseOnFocusLoss: false,
  autoClose: 1500,
});
