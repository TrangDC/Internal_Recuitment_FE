import { Box, Button, styled } from '@mui/material'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import InputFile from 'shared/components/input-fields/InputFile'

const DivInformation = styled(FlexBox)(({ theme }) => ({
  padding: '24px',
  flexWrap: 'wrap',
  gap: '20px',
  borderRight: '1px solid',
  borderColor: theme.palette.grey[200],
}))

const DivItemInformation = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const ButtonStatus = styled(Button)(({ theme }) => ({
  width: '100%',
}))

const JobDetailInformation = () => {
  return (
    <DivInformation>
      <FlexBox flexWrap={'wrap'} gap={'20px'}>
        <InputFile />
        <Span>Hara Nguyen</Span>
      </FlexBox>
      <FlexBox flexWrap={'wrap'} gap={'20px'}>
        <DivItemInformation>
          <SpanText>Full name</SpanText>
          <TinyText>Nguyen Thi Nhu Quynh</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Applied on</SpanText>
          <TinyText>10:30 AM, 10/03/2024</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Job applied</SpanText>
          <TinyText>UIUX Designer</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <ButtonStatus
            variant="contained"
            startIcon={<EditIcon sx={{ backgroundColor: 'white' }} />}
          >
            Change status
          </ButtonStatus>
        </DivItemInformation>
      </FlexBox>
    </DivInformation>
  )
}

export default JobDetailInformation
