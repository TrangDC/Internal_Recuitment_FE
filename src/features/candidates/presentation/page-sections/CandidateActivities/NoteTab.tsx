import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Note from '../../components/activities-category/Note'
import Scrollbar from 'shared/components/ScrollBar'
import useGetAllCandidateNote from 'features/candidates/hooks/candidate-activity/crud/useGetALLCandidateNote'

const NoteTab = () => {
  const { id } = useParams()
  const { noteOptionActions, filters } = useCandidateActivityContext()
  const { candidateNotes } = useGetAllCandidateNote({
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
        {candidateNotes.map((candidateNote) => (
          <Note
            key={candidateNote.id}
            candidateNote={candidateNote}
            actions={noteOptionActions}
          />
        ))}
      </Scrollbar>
    </FlexBox>
  )
}

export default NoteTab
