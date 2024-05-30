import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import GeneralInformation from '../page-sections/GeneralInformation'
import HistoryLog from '../page-sections/HistoryLog'
import TabCustomize from 'shared/components/tab'
import useTextTranslation from 'shared/constants/text'
import { TextHeading } from 'shared/components/utils/textScreen'
import TeamIcon from 'shared/components/icons/Team'

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
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <TeamIcon sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <TextHeading>Team detail</TextHeading>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobDetail
