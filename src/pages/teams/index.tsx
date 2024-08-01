import { Box } from '@mui/material'
import HiringTeam from 'features/hiring-team/presentation/screens/teams-list'
import RecuitmentTeam from 'features/rec-team/presentation/screens/rec-team-list'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelmetComponent from 'shared/components/helmet'
import TeamIcon from 'shared/components/icons/Team'
import TabCustomize from 'shared/components/tab'
import IconScreen from 'shared/components/utils/IconScreen'

function TeamsPage() {
  const renderItem = [
    { label: 'Hiring team', Component: HiringTeam },
    { label: 'Recuitment team', Component: RecuitmentTeam },
  ]
  return (
    <HelmetComponent title="[TREC] Teams">
      <Box pt={2} pb={4}>
        <Box>
          <FlexBox gap={0.5} alignItems="center">
            <IconScreen Icon={TeamIcon} textLable="Teams" />
          </FlexBox>
        </Box>
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <TabCustomize renderItem={renderItem} />
        </Box>
      </Box>
    </HelmetComponent>
  )
}
export default TeamsPage
