import SkillList from 'features/skill/presentation/screens/skill-list'
import HelmetComponent from 'shared/components/helmet'

function SkillPage() {
  return (
    <HelmetComponent title="[TREC] Skills">
      <SkillList />
    </HelmetComponent>
  )
}
export default SkillPage