import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconScreen from 'shared/components/utils/IconScreen'
import { Skill } from '../page-sections'
import SkillIcon from 'shared/components/icons/SkillIcon'
import { SkillType } from 'features/skillType/presentation/page-sections'
import TabCustomize from 'shared/components/tab'

const SkillList = () => {
  const renderItem = [
    { label: 'Skill', Component: Skill },
    { label: 'Skill type', Component: SkillType },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconScreen Icon={SkillIcon} textLable="Skill management" />
        </FlexBox>
      </Box>
       <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default SkillList
