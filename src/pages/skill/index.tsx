import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconScreen from 'shared/components/utils/IconScreen'
import SkillIcon from 'shared/components/icons/SkillIcon'
import TabCustomize from 'shared/components/tab'
import HelmetComponent from 'shared/components/helmet'
import usePermission from 'features/authorization/hooks/usePermission'
import SkillTypeList from 'features/skillType/presentation/screens'
import SkillList from 'features/skill/presentation/screens'

function SkillPage() {
  const renderItem = []
  const cantViewSkill = usePermission({
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything'],
    },
    module: 'SKILLS',
  })

  const cantViewSkillType = usePermission({
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything'],
    },
    module: 'SKILL_TYPES',
  })

  if (cantViewSkill) {
    renderItem.push({ label: 'Skill', Component: SkillList })
  }

  if (cantViewSkillType) {
    renderItem.push({ label: 'Skill type', Component: SkillTypeList })
  }
  return (
    <HelmetComponent title="[TREC] Skills">
      <Box pt={2} pb={4}>
        <Box>
          <FlexBox gap={0.5} alignItems="center">
            <IconScreen Icon={SkillIcon} textLabel="Skill management" />
          </FlexBox>
        </Box>
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <TabCustomize renderItem={renderItem} />
        </Box>
      </Box>
    </HelmetComponent>
  )
}
export default SkillPage
