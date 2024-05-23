import { Box, BoxProps, styled } from '@mui/material'
import { TinyText } from 'shared/components/form/styles'

export const BoxTextStyle = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  backgroundColor: '#F0F1F8',
  padding: '0px 4px',
  borderRadius: '2px',
}))

interface Props {
  content: string
  boxProps?: BoxProps
}

const BoxTextSquare = ({ boxProps, content }: Props) => {
  return (
    <BoxTextStyle {...boxProps}>
      <Box></Box>
      <TinyText
        sx={{
          fontSize: '10px',
          lineHeight: '12.19px',
          color: '#4D607A'
        }}
      >
        {content}
      </TinyText>
    </BoxTextStyle>
  )
}

export default BoxTextSquare
