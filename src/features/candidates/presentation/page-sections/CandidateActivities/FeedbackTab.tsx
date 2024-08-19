import useGetALLCandidateFeedback from 'features/candidates/hooks/candidate-activity/crud/useGetALLCandidateFeedback'
import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import Feedback from '../../components/activities-category/Feedback'

const FeedbackTab = () => {
  const { id } = useParams()
  const { filters } = useCandidateActivityContext()
  const { candidateFeedbacks } = useGetALLCandidateFeedback({
    id: id || '',
    filters,
  })
  return (
    <FlexBox
      flexDirection={'column'}
      width={'100%'}
      height={'calc(80vh - 170px)'}
      marginTop={2}
    >
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
