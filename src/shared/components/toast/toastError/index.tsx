import { Box, styled } from '@mui/material'
import toast from 'react-hot-toast'

const BoxError = styled(Box)(({ theme }) => ({
  wordBreak: 'break-all',
}))

export default function toastError(
  msg: string | string[],
  setting = { duration: 5000 }
) {
  let msgError = msg

  if (Array.isArray(msg)) {
    msgError = msg.map((_: any) => _.message).join('\n')
  }

  toast.error(<BoxError>{msgError}</BoxError>, {
    ...setting,
  })
}
