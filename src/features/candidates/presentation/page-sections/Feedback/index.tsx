import { Box, styled } from '@mui/material'
import FeedbackInformation from '../FeedbackInformation'
import FeedbackShow from '../FeedbackList'

const FeedBackWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: '24px 16px',
}))

const FeedbackList = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  padding: '24px 16px',
}))

const Feedback = () => {
  return (
    <FeedBackWrapper>
      <FormWrapper>
        <FeedbackInformation />
      </FormWrapper>
      <FeedbackList>
        <FeedbackShow />
      </FeedbackList>
    </FeedBackWrapper>
  )
}

export default Feedback
