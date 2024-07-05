import { Checkbox, CheckboxProps } from '@mui/material'
import { FC } from 'react'

const AppCheckBox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      disableRipple
      sx={{
        mr: 1,
        color: 'grey.300',
      }}
      {...props}
    />
  )
}

export default AppCheckBox
