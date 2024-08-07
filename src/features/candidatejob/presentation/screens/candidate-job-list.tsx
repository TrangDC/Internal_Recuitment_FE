import { Box } from '@mui/system'
import GeneralInformation from '../page-sections/GeneralInformation'
import TabCustomize from 'shared/components/tab'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'
import HistoryLog from '../page-sections/HistoryLog'

const CandidateJobList = () => {
  const renderItem = [
    { label: 'General Information', Component: GeneralInformation },
    { label: 'History log', Component: HistoryLog },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={CandidateIcon}
          textLabel={'Candidate details'}
          go_back={true}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default CandidateJobList
