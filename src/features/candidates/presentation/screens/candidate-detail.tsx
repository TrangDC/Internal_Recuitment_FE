import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import GeneralInformation from '../page-sections/GeneralInformation'
import Feedback from '../page-sections/Feedback'
import TabCustomize from 'shared/components/tab'

const JobDetail = () => {
  const renderItem = [
    {label: 'Genaral Information', Component: GeneralInformation},
    {label: 'Feed back', Component: Feedback},
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>Candidate details</H5>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem}/>
      </Box>
    </Box>
  )
}

export default JobDetail