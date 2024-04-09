import { Checkbox, CheckboxProps } from '@mui/material'
import { FC } from 'react'
import OvalCheckedIcon from 'shared/components/icons/OvalCheckedIcon'
import OvalIcon from 'shared/components/icons/OvalIcon'

const RoundCheckBox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      disableRipple
      checkedIcon={<OvalCheckedIcon fontSize="small" color="primary" />}
      icon={<OvalIcon fontSize="small" color="primary" />}
      {...props}
    />
  )
}

export default RoundCheckBox
