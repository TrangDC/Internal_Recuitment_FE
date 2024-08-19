import useGetALLCandidateInterview from 'features/candidates/hooks/candidate-activity/crud/useGetALLCandidateInterview'
import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import Interview from '../../components/activities-category/Interview'

const InterviewTab = () => {
  const { id } = useParams()
  const { filters } = useCandidateActivityContext()
  const { candidateInterviews } = useGetALLCandidateInterview({
    id: id || '',
    filters,
  })
  return (
    <FlexBox
      flexDirection={'column'}
      height={'calc(80vh - 130px)'}
      width={'100%'}
      marginTop={2}
    >
      <Scrollbar>
        {candidateInterviews.map((candidateInterview) => (
          <Interview
            candidateInterview={candidateInterview}
            key={candidateInterview.id}
          />
        ))}
      </Scrollbar>
    </FlexBox>
  )
}

export default InterviewTab
