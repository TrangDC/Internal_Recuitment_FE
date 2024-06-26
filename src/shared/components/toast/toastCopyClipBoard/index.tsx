import { ToastOptions, toast } from 'react-toastify'

interface Props {
  content?: string
  toastOptions?: ToastOptions
  type: 'success' | 'error'
}

export const ToastCopyClipBoard = ({
  content = 'Copy to clipboard',
  toastOptions,
  type,
}: Props) => {
  const defaultToast: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    theme: 'light',
    style: {
      background: '#D4FCEC',
      border: '#ABF9E0',
      color: '#20A4A9',
    },
  }
  if (type === 'success')
    return toast.success(content, {
      ...defaultToast,
      ...toastOptions,
    })
  return toast.error(content, {
    ...defaultToast,
    ...toastOptions,
  })
}
