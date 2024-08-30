import EditJobRequest from 'features/jobs/presentation/screens/edit-job-request';
import HelmetComponent from 'shared/components/helmet';

function EditJobRequestPage() {
  return (
    <HelmetComponent title="[TREC] Edit job request">
      <EditJobRequest />
    </HelmetComponent>
  )
}
export default EditJobRequestPage