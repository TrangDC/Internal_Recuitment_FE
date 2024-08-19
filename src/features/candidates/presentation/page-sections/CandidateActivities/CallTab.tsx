import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Call from '../../components/activities-category/Call'
import Scrollbar from 'shared/components/ScrollBar'
import useGetALLCandidateHistoryCall from 'features/candidates/hooks/candidate-activity/crud/useGetALLCandidateHistoryCall'

const CallTab = () => {
  const { id } = useParams()
  const { historyCallOptionActions, filters } = useCandidateActivityContext()
  const { candidateHistoryCalls } = useGetALLCandidateHistoryCall({
    id: id || '',
    filters,
  })
  return (
    <FlexBox
      flexDirection={'column'}
      width={'100%'}
      height={'calc(80vh - 130px)'}
      marginTop={2}
    >
      <Scrollbar>
        {candidateHistoryCalls.map((candidateHistoryCall) => (
          <Call
            key={candidateHistoryCall.id}
            candidateHistoryCall={candidateHistoryCall}
            actions={historyCallOptionActions}
          />
        ))}
      </Scrollbar>
    </FlexBox>
  )
}

export default CallTab
