import { FormHelperText } from '@mui/material'

type IHelperTextForm = {
  message: string | undefined
}

function HelperTextForm({ message }: IHelperTextForm) {
  return <FormHelperText error>{message}</FormHelperText>
}
export default HelperTextForm
