import { toast } from 'react-toastify';

export function displayToast(msg,type) {
    if (type ==='success'){
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
  }else if(type === "error"){
    toast.error(msg, {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }else if(type === "warning"){
    toast.error(msg, {
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


}