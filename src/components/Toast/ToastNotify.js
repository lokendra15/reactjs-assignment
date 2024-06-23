import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const options = {
  position: 'bottom-right',
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ToastNotifyInfo = (message, id) => {
  return <>{toast.info(message, { ...options, toastId: `info-${id}` })}</>;
};
export const ToastNotifySuccess = (message, id) => {
  return (
    <>
      {toast.success(message, {
        ...options,
        toastId: `success-${id}`,
      })}
    </>
  );
};
export const ToastNotifyError = (message, id) => {
  return <>{toast.error(message, { ...options, toastId: `error-${id}` })}</>;
};
