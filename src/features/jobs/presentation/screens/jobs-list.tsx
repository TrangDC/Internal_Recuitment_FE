import { Box } from '@mui/system'
import useTextTranslation from 'shared/constants/text'
import IconScreen from 'shared/components/utils/IconScreen'
import TabCustomize from 'shared/components/tab'
import AllJobs from '../page-sections/AllJobs'
import OpeningJob from '../page-sections/OpeningJobs'
import MicroScope from 'shared/components/icons/Microscope'

const JobsList = () => {
  const translation = useTextTranslation()

  const renderItem = [
    { label: 'Opening Jobs', Component: OpeningJob },
    { label: 'All Jobs', Component: AllJobs },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={MicroScope} textLabel={translation.MODLUE_JOBS.jobs} />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobsList
