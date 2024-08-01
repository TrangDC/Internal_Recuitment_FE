import UserList from 'features/user/presentation/screens/user-list'
import HelmetComponent from 'shared/components/helmet'

const UserPage = () => {
  return (
    <HelmetComponent title="[TREC] Hiring Team">
      <UserList />
    </HelmetComponent>
  )
}

export default UserPage
