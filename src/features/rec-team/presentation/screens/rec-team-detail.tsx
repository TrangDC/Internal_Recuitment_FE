import { Box } from '@mui/system'
import TeamIcon from 'shared/components/icons/Team'
import TabCustomize from 'shared/components/tab'
import IconScreen from 'shared/components/utils/IconScreen'
import useTextTranslation from 'shared/constants/text'
import GeneralInformation from '../page-sections/GeneralInformation'
import HistoryLog from '../page-sections/HistoryLog'

const RecTeamDetail = () => {
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
        <IconScreen Icon={TeamIcon} textLable={'REC team details'} go_back={true}/>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default RecTeamDetail
