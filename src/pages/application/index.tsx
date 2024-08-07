import ApplicationScreen from 'features/application/presentation/screens/application-list'
import HelmetComponent from 'shared/components/helmet'

function ApplicationPage() {

  return (
    <HelmetComponent title="[TREC] Application">
      <ApplicationScreen />
    </HelmetComponent>
  )
}

export default ApplicationPage
