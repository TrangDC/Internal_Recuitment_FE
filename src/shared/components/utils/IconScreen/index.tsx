import React, { CSSProperties } from 'react'
import IconWrapper from 'shared/components/IconWrapper'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TextHeading } from '../textScreen'
import { SvgIconProps } from '@mui/material'
import { LinkGoBack } from 'shared/styles'
import GoBackIcon from 'shared/components/icons/GoBackIcon'

interface Props {
  Icon: React.ComponentType<SvgIconProps>
  textLable: string
  icon_style?: CSSProperties
  parent_style?: CSSProperties
  link?: string
}

const IconScreen = ({
  Icon,
  textLable,
  icon_style = { color: 'primary.main' },
  parent_style,
  link = '',
}: Props) => {
  return (
    <FlexBox gap={0.5} alignItems={'center'} sx={{ ...parent_style }}>
      <IconWrapper>
        <Icon sx={{ ...icon_style }} />
      </IconWrapper>
      <FlexBox flexDirection={'column'} gap={'2px'}>
        <TextHeading>{textLable}</TextHeading>
        {link && (
          <LinkGoBack to={link}>
            <GoBackIcon
              sx={{
                fontSize: '12px',
              }}
            />{' '}
            Go back
          </LinkGoBack>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default IconScreen
