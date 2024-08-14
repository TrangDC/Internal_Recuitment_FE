import useGetALLCandidateInterview from 'features/candidates/hooks/candidate-detail/useGetALLCandidateInterview'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import Interview from '../../components/activities-category/Interview'

const InterviewTab = () => {
  const { id } = useParams()
  const { candidateInterviews } = useGetALLCandidateInterview(id)
  return (
    <FlexBox flexDirection={'column'} height={'65vh'} width={'100%'}>
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
