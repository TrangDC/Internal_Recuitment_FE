import { Box, Button, styled } from '@mui/material'
import { format } from 'date-fns'
import { CandidateJob } from 'features/candidates/domain/interfaces'
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

interface JobDetailInformationProps {
  jobApplicationDetail: CandidateJob
}

const JobDetailInformation = ({ jobApplicationDetail }: JobDetailInformationProps) => {
  
  return (
    <DivInformation>
      <FlexBox flexWrap={'wrap'} gap={'20px'}>
        <InputFile />
      </FlexBox>
      <FlexBox flexWrap={'wrap'} gap={'20px'}>
        <DivItemInformation>
          <SpanText>Full name</SpanText>
          <TinyText>{jobApplicationDetail?.candidate?.name}</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Applied on</SpanText>
          <TinyText>{jobApplicationDetail?.candidate?.last_apply_date && format(new Date(jobApplicationDetail?.candidate.last_apply_date), 'HH:mm, dd/MM/yyyy')}</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Job applied</SpanText>
          <TinyText>{jobApplicationDetail?.hiring_job?.name}</TinyText>
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
