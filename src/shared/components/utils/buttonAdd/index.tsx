import { Button, SvgIconProps, SxProps } from '@mui/material'
import React from 'react'
import { Span } from 'shared/components/Typography'

interface Props {
  Icon: React.ComponentType<SvgIconProps>
  textLable: string
  onClick?: () => void
  variant?: 'text' | 'outlined' | 'contained'
  icon_style?: SxProps
  position_icon?: 'start' | 'end'
  disabled?: boolean
  sx?: SxProps
}

const ButtonAdd = (props: Props) => {
  const {
    icon_style = {},
    Icon,
    textLable,
    onClick,
    variant = 'contained',
    position_icon = 'start',
    disabled = false,
    sx = {},
  } = props

  const adornment = (
    <Icon
      sx={{
        fontSize: '15px !important',
        ...icon_style,
      }}
    />
  )

  return (
    <Button
      disabled={disabled}
      variant={variant}
      sx={sx}
      onClick={() => {
        onClick && onClick()
      }}
      {...(position_icon === 'start'
        ? { startIcon: adornment }
        : { endIcon: adornment })}
    >
      <Span fontSize={13}>{textLable}</Span>
    </Button>
  )
}

export default ButtonAdd
