import { ToastOptions, toast } from "react-toastify";

interface Props {
  content?: string,
  toastOptions?: ToastOptions,
}

export const ToastCopyClipBoard = ({
  content = 'Copy to clipboard',
  toastOptions,
}: Props = {}) => {
    const defaultToast: ToastOptions = {
      position: 'bottom-right',
      autoClose: 5000,
      theme: 'light',
      style: {
        background: '#D4FCEC',
        border: '#ABF9E0',
        color: '#20A4A9',
      },
    };
  
    return toast.success(content, {
      ...defaultToast,
      ...toastOptions,
    });
  };
  