import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import GeneralInformation from '../page-sections/GeneralInformation'
import HistoryLog from '../page-sections/HistoryLog'
import TabCustomize from 'shared/components/tab'
import useTextTranslation from 'shared/constants/text'

const JobDetail = () => {
  const translation = useTextTranslation();

  const renderItem = [
    {label: translation.MODLUE_JOBS.general_information, Component: GeneralInformation},
    {label: translation.MODLUE_JOBS.history_log, Component: HistoryLog},
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>{translation.MODLUE_JOBS.job_detail}</H5>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem}/>
      </Box>
    </Box>
  )
}

export default JobDetail
