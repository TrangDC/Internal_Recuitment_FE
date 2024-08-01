import JobPositionDetail from 'features/job-position/presentation/screens/jop-position-detail';
import HelmetComponent from 'shared/components/helmet';

const JobPositionDetailPage = () => {
  return (
    <HelmetComponent title='[TREC] Job position detail'>
       <JobPositionDetail />
    </HelmetComponent>
  )
}

export default JobPositionDetailPage