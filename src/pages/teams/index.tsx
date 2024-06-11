import TeamList from 'features/teams/presentation/screens/teams-list'
import HelmetComponent from 'shared/components/helmet'

function TeamsPage() {
  return (
    <HelmetComponent title='[TREC] Teams'>
       <TeamList />
    </HelmetComponent>
  )
}
export default TeamsPage
