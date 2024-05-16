import { Button, SvgIconProps } from '@mui/material'
import React from 'react'
import { Span } from 'shared/components/Typography'

interface Props {
    Icon: React.ComponentType<SvgIconProps>,
    textLable: string,
    onClick?: () => void,
}

const ButtonAdd = ({Icon, textLable, onClick}: Props) => {
  return (
    <Button
      variant="contained"
      startIcon={<Icon sx={{ fontSize: '15px !important' }} />}
      onClick={() => {onClick && onClick()}}
    >
      <Span fontSize={13}>{textLable}</Span>
    </Button>
  )
}

export default ButtonAdd
