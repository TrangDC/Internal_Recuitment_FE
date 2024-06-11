import CandidateList from 'features/candidates/presentation/screens/candidate-list';
import HelmetComponent from 'shared/components/helmet';

const CandidatePage = () => {
  return (
    <HelmetComponent title="[TREC] Candidates">
      <CandidateList />
    </HelmetComponent>
  )
}

export default CandidatePage