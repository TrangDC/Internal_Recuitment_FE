import CandidateDetail from 'features/candidatejob/presentation/screens/candidate-job-list';
import HelmetComponent from 'shared/components/helmet';

const CandidatePageDetail = () => {
  return (
    <HelmetComponent title="[TREC] Candidate details">
      <CandidateDetail />
    </HelmetComponent>
  )
}

export default CandidatePageDetail