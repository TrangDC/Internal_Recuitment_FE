import useGetALLCandidateFeedback from 'features/candidates/hooks/candidate-detail/useGetALLCandidateFeedback'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import Feedback from '../../components/activities-category/Feedback'

const FeedbackTab = () => {
  const { id } = useParams()
  const { candidateFeedbacks } = useGetALLCandidateFeedback(id)
  return (
    <FlexBox flexDirection={'column'} height={'65vh'} width={'100%'}>
      <Scrollbar>
        {candidateFeedbacks.map((candidateFeedback) => (
          <Feedback
            candidateJobFeedback={candidateFeedback}
            key={candidateFeedback.id}
          />
        ))}
      </Scrollbar>
    </FlexBox>
  )
}

export default FeedbackTab
