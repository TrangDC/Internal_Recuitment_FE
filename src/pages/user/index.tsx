import UserList from 'features/user/presentation/screens/user-list'
import HelmetComponent from 'shared/components/helmet'

const UserPage = () => {
  return (
    <HelmetComponent title="[TREC] User">
      <UserList />
    </HelmetComponent>
  )
}

export default UserPage
