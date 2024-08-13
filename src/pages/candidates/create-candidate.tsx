import CreateCandidate from 'features/candidates/presentation/screens/create-candidate'
import HelmetComponent from 'shared/components/helmet'

function CreateCandidatePage() {
  return (
    <HelmetComponent title="[TREC] Create candidates">
      <CreateCandidate />
    </HelmetComponent>
  )
}

export default CreateCandidatePage
