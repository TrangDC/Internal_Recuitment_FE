import { Box } from '@mui/system'
import GeneralInformation from '../page-sections/GeneralInformation'
import HistoryLog from '../page-sections/HistoryLog'
import TabCustomize from 'shared/components/tab'
import useTextTranslation from 'shared/constants/text'
import IconScreen from 'shared/components/utils/IconScreen'
import Jobs from 'shared/components/icons/Jobs'

const JobDetail = () => {
  const translation = useTextTranslation()

  const renderItem = [
    {
      label: translation.MODLUE_JOBS.general_information,
      Component: GeneralInformation,
    },
    { label: translation.MODLUE_JOBS.history_log, Component: HistoryLog },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Jobs} textLabel={'Job position detail'} go_back={true}/>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobDetail
