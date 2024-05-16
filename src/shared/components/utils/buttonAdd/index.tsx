import { CSSProperties } from '@emotion/serialize'
import { Button, SvgIconProps } from '@mui/material'
import React from 'react'
import { Span } from 'shared/components/Typography'

interface Props {
  Icon: React.ComponentType<SvgIconProps>
  textLable: string
  onClick?: () => void
  variant?: 'text' | 'outlined' | 'contained'
  icon_style?: CSSProperties
  position_icon?: 'start' | 'end'
}

const ButtonAdd = (props: Props) => {
  const {
    icon_style = {},
    Icon,
    textLable,
    onClick,
    variant = 'contained',
    position_icon = 'start',
  } = props
  const adornment = (
    <Icon
      sx={{
        fontSize: 15,
        ...icon_style,
      }}
    />
  )

  return (
    <Button
      variant={variant}
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
