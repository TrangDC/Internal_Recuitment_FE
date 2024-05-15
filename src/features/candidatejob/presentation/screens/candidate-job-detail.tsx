import { DivContainerWrapper } from '../providers/styles'
import {
  Box,
  Grid,
  styled,
} from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import { ShoppingBasket } from '@mui/icons-material'
import JobDetailInformation from '../page-sections/JobDetailInformation'
import JobDetailAction from '../page-sections/JobDetailAction'

const DivWrapperContainer = styled(DivContainerWrapper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  borderRadius: '8px',
}))

const CandidateJobDetail = () => {

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>Job Application detail</H5>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <DivWrapperContainer>
          <Grid container>
            <Grid item xs={3}>
              <JobDetailInformation />
            </Grid>
            <Grid item xs={9}>
              <JobDetailAction />
            </Grid>
          </Grid>
        </DivWrapperContainer>
      </Box>
    </Box>
  )
}

export default CandidateJobDetail
