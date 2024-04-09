import { Checkbox, CheckboxProps } from '@mui/material'
import BlankCheckBoxIcon from 'shared/components/icons/BlankCheckBoxIcon'
import CheckBoxIcon from 'shared/components/icons/CheckBoxIcon'
import { FC } from 'react'

const AppCheckBox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      disableRipple
      checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
      icon={<BlankCheckBoxIcon fontSize="small" color="disabled" />}
    />
  )
}

export default AppCheckBox
