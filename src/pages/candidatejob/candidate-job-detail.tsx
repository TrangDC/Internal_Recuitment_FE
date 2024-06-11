import CandidateJobDetail from 'features/candidatejob/presentation/screens/candidate-job-detail';
import HelmetComponent from 'shared/components/helmet';

const CandidateJobDetailPage = () => {

  return (
    <HelmetComponent title="[TREC] Job application detail">
      <CandidateJobDetail />
    </HelmetComponent>
  )
}

export default CandidateJobDetailPage