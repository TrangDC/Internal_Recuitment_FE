import React, { CSSProperties } from 'react'
import IconWrapper from 'shared/components/IconWrapper'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TextHeading } from '../textScreen'
import { SvgIconProps } from '@mui/material'
import { LinkGoBack } from 'shared/styles'
import GoBackIcon from 'shared/components/icons/GoBackIcon'
import { useNavigate } from 'react-router-dom'

interface Props {
  Icon: React.ComponentType<SvgIconProps>
  textLable: string
  icon_style?: CSSProperties
  parent_style?: CSSProperties
  go_back?: boolean
}

const IconScreen = ({
  Icon,
  textLable,
  icon_style = { color: 'primary.main' },
  parent_style,
  go_back = false,
}: Props) => {
const navigate = useNavigate();

  return (
    <FlexBox gap={0.5} alignItems={'center'} sx={{ ...parent_style }}>
      <IconWrapper>
        <Icon sx={{ ...icon_style }} />
      </IconWrapper>
      <FlexBox flexDirection={'column'} gap={'2px'}>
        <TextHeading>{textLable}</TextHeading>
        {go_back && (
          <LinkGoBack onClick={() => navigate(-1)}>
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
