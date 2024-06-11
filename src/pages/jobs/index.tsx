import JobList from 'features/jobs/presentation/screens/jobs-list'
import HelmetComponent from 'shared/components/helmet'

function JobsPage() {
  return (
    <HelmetComponent title="[TREC] Jobs">
      <JobList />
    </HelmetComponent>
  )
}
export default JobsPage
