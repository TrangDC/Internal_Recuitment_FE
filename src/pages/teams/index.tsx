import { Box } from '@mui/material'
import usePermission from 'features/authorization/hooks/usePermission'
import HiringTeam from 'features/hiring-team/presentation/screens/teams-list'
import RecuitmentTeam from 'features/rec-team/presentation/screens/rec-team-list'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelmetComponent from 'shared/components/helmet'
import TeamIcon from 'shared/components/icons/Team'
import TabCustomize from 'shared/components/tab'
import IconScreen from 'shared/components/utils/IconScreen'

function TeamsPage() {
  const renderItem = []
  const cantViewHiringTeam = usePermission({
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'HIRING_TEAMS',
  })

  const cantViewRecTeam = usePermission({
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'REC_TEAMS',
  })

  if (cantViewHiringTeam) {
    renderItem.push({ label: 'Hiring team', Component: HiringTeam })
  }

  if (cantViewRecTeam) {
    renderItem.push({ label: 'Recruitment team', Component: RecuitmentTeam })
  }
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
