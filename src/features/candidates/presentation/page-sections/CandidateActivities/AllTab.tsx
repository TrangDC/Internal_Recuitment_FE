import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import Call from '../../components/activities-category/Call'
import { useParams } from 'react-router-dom'
import { ActivitiesCategoryEnums } from 'features/candidates/domain/interfaces/canidate-activities'
import Interview from '../../components/activities-category/Interview'
import Note from '../../components/activities-category/Note'
import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import Email from '../../components/activities-category/Email'
import useGetCandidateActivities from 'features/candidates/hooks/candidate-activity/crud/useGetCandidateActivities'

const AllTab = () => {
  const { id } = useParams()
  const { noteOptionActions, historyCallOptionActions, filters } =
    useCandidateActivityContext()
  const { candidateActivityData, fetchNextPage, totalRecord, total } =
    useGetCandidateActivities({
      id: id || '',
      filters,
    })

  function loadMore() {
    if (totalRecord > total) {
      fetchNextPage()
    }
  }
  return (
    <FlexBox
      flexDirection={'column'}
      width={'100%'}
      height={'calc(80vh - 170px)'}
      marginTop={2}
    >
      <Scrollbar onBottom={loadMore}>
        {candidateActivityData.map((o) => {
          switch (o.type) {
            case ActivitiesCategoryEnums.HISTORY_CALL:
              return (
                <Call
                  candidateHistoryCall={o.data}
                  key={o.data.id}
                  actions={historyCallOptionActions}
                />
              )
            case ActivitiesCategoryEnums.INTERVIEW:
              return <Interview candidateInterview={o.data} key={o.data.id} />
            case ActivitiesCategoryEnums.EMAIL:
              return <Email outgoingEmail={o.data} key={o.data.id} />
            case ActivitiesCategoryEnums.NOTE:
              return (
                <Note
                  candidateNote={o.data}
                  key={o.data.id}
                  actions={noteOptionActions}
                />
              )
            default:
              return <></>
          }
        })}
      </Scrollbar>
    </FlexBox>
  )
}

export default AllTab
