import React, { CSSProperties } from 'react'
import IconWrapper from 'shared/components/IconWrapper'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TextHeading } from '../textScreen'
import { SvgIconProps } from '@mui/material'

interface Props {
  Icon: React.ComponentType<SvgIconProps>
  textLable: string
  icon_style?: CSSProperties
  parent_style?: CSSProperties
}

const IconScreen = ({
  Icon,
  textLable,
  icon_style = { color: 'primary.main' },
  parent_style,
}: Props) => {
  return (
    <FlexBox gap={0.5} alignItems={'center'} sx={{...parent_style}}>
      <IconWrapper>
        <Icon sx={{ ...icon_style }} />
      </IconWrapper>
      <TextHeading>{textLable}</TextHeading>
    </FlexBox>
  )
}

export default IconScreen
