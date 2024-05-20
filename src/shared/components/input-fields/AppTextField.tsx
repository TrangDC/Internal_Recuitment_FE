import { styled, TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '4px',
    borderColor: `${theme.palette.grey[300]}`,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.action.hover,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '21px',
    color: theme.palette.grey[500],
    '& .MuiFormLabel-asterisk': {
      color: theme.palette.error.main,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': { fontWeight: 600 },
  '& .MuiSvgIcon-root': { color: theme.palette.text.disabled },
}))

const AppTextField: FC<TextFieldProps> = (props) => {
  return <StyledTextField {...props} />
}

export default AppTextField
