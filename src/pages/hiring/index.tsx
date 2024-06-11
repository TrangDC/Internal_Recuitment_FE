import HiringList from 'features/hiring/presentation/screens/hiring-list'
import HelmetComponent from 'shared/components/helmet'

const HiringPage = () => {
  return (
    <HelmetComponent title="[TREC] Hiring Team">
      <HiringList />
    </HelmetComponent>
  )
}

export default HiringPage