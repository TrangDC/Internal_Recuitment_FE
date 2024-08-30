import { Box } from '@mui/system'
import useTextTranslation from 'shared/constants/text'
import IconScreen from 'shared/components/utils/IconScreen'
import TabCustomize from 'shared/components/tab'
import JobOpening from '../page-sections/JobOpening'
import AllJobRequest from '../page-sections/AllJobRequest'
import MicroScope from 'shared/components/icons/Microscope'
import PendingApprovals from '../page-sections/PendingApproval'

const JobsList = () => {
  const translation = useTextTranslation()

  const renderItem = [
    { label: 'Opening', Component: JobOpening },
    { label: 'Pending approvals', Component: PendingApprovals },
    { label: 'All job request', Component: AllJobRequest },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={MicroScope}
          textLabel={translation.MODLUE_JOBS.jobs}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobsList
