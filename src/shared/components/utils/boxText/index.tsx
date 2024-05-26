import { BoxProps, styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'

export const BoxTextStyle = styled(FlexBox)(({ theme }) => ({
  width: 'fit-content',
  backgroundColor: '#F0F1F8',
  padding: '0px 4px',
  borderRadius: '2px',
  color: '#4D607A',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '14px',

  '& p': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  }
}))

interface Props {
  content: string
  boxProps?: BoxProps
}

const BoxTextSquare = ({boxProps, content }: Props) => {
  return (
    <BoxTextStyle {...boxProps}>
      <TinyText
      >
        {content}
      </TinyText>
    </BoxTextStyle>
  )
}

export default BoxTextSquare
