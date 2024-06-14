import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconScreen from 'shared/components/utils/IconScreen'
import { Skill } from '../page-sections'
import SkillIcon from 'shared/components/icons/SkillIcon'

const SkillList = () => {

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconScreen
            Icon={SkillIcon}
            textLable="Skill"
          />
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <Skill />
      </Box>
    </Box>
  )
}

export default SkillList
