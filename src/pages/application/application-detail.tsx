import CandidateJobDetail from 'features/application/presentation/screens/application-detail';
import HelmetComponent from 'shared/components/helmet';

const ApplicationDetail = () => {

  return (
    <HelmetComponent title="[TREC] Job application detail">
      <CandidateJobDetail />
    </HelmetComponent>
  )
}

export default ApplicationDetail