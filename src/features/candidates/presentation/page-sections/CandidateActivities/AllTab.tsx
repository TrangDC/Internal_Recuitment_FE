import FlexBox from 'shared/components/flexbox/FlexBox'
import Note from '../../components/activities-category/Note'
import Scrollbar from 'shared/components/ScrollBar'
import Call from '../../components/activities-category/Call'
import useGetCandidateActivities from 'features/candidates/hooks/candidate-detail/useGetCandidateActivities'
import { useParams } from 'react-router-dom'

const AllTab = () => {
  const { id } = useParams()
  const {} = useGetCandidateActivities(id)
  return (
    <FlexBox flexDirection={'column'} height={'65vh'} width={'100%'}>
      <Scrollbar>
        <Note />
        <Call />
        {/* <Interview /> */}
      </Scrollbar>
    </FlexBox>
  )
}

export default AllTab
