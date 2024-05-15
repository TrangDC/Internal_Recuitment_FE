import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../providers/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListInterview from 'features/interviews/presentation/page-sections/ListInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'

const JobDetailAction = () => {
  return (
    <DivActionWrapper>
      <DivAction>
        <StepInterview />
      </DivAction>
      <Divider />
      <DivAction>
        <ListInterview />
      </DivAction>
      <Divider />
      <DivAction>
        <ListFeedBack />
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
