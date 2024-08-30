import { Box } from '@mui/system'
import Jobs from 'shared/components/icons/Jobs'
import TabCustomize from 'shared/components/tab'
import IconScreen from 'shared/components/utils/IconScreen'
import JobInformation from '../page-sections/JobInformation'
import { HistoryLog } from '../page-sections'

const JobDetail = () => {
  const renderItem = [
    { label: 'Information', Component: JobInformation },
    { label: 'History log', Component: HistoryLog },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={Jobs}
          textLabel={'Job request details'}
          go_back={true}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobDetail
