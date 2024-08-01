import JobPositionList from 'features/job-position/presentation/screens/job-position-list'
import HelmetComponent from 'shared/components/helmet'

function JobPositionPage() {
  return (
    <HelmetComponent title="[TREC] Job Position">
      <JobPositionList />
    </HelmetComponent>
  )
}
export default JobPositionPage
