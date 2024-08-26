import JobList from 'features/jobs/presentation/screens/jobs-list'
import HelmetComponent from 'shared/components/helmet'

function JobsPage() {
  return (
    <HelmetComponent title="[TREC] Job request">
      <JobList />
    </HelmetComponent>
  )
}
export default JobsPage
