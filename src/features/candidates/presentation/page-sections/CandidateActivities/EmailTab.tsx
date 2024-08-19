import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Email from '../../components/activities-category/Email'
import Scrollbar from 'shared/components/ScrollBar'
import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import useGetALLCandidateEmail from 'features/candidates/hooks/candidate-activity/crud/useGetALLCandidateEmail'

const EmailTab = () => {
  const { id } = useParams()
  const { filters } = useCandidateActivityContext()
  const { candidateEmails } = useGetALLCandidateEmail({
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
        {candidateEmails.map((candidateEmail) => (
          <Email key={candidateEmail.id} outgoingEmail={candidateEmail} />
        ))}
      </Scrollbar>
    </FlexBox>
  )
}

export default EmailTab
