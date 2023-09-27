import { toast } from 'react-toastify';

export function displayToast(msg) {
    toast.success(msg, {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
}