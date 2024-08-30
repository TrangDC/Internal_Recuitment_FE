import AddJobRequest from 'features/jobs/presentation/screens/add-job-request';
import HelmetComponent from 'shared/components/helmet';

function AddJobRequestPage() {
  return (
    <HelmetComponent title="[TREC] Add a new request">
      <AddJobRequest />
    </HelmetComponent>
  )
}
export default AddJobRequestPage