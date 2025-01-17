import { Box, Divider, Grid, Paper, styled } from '@mui/material'
import CandidateConversationRateReport from 'features/report/presentation/charts/CandidateConversationRateReport'
import CandidateReport from 'features/report/presentation/charts/CandidateReport/CandidateReport'
import RecruitmentApplication from 'features/report/presentation/charts/RecruitmentApplication/RecruitmentApplication'
import RecruitmentTrends from 'features/report/presentation/charts/RecruitmentTrends/RecruitmentTrends'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ReportIcon from 'shared/components/icons/Report'
import IconScreen from 'shared/components/utils/IconScreen'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0px 2px 4px 0px #60617029',
}))

function ReportScreen() {
  return (
    <Box pt={2} pb={4}>
      <Box marginBottom={'20px'}>
        <IconScreen
          Icon={ReportIcon}
          textLabel={'Report'}
          icon_style={{
            '& path': {
              fill: '#2499EF',
            },
          }}
        />
      </Box>
      <Grid container spacing={2} height={290}>
        <Grid item xs={12}>
          <Item>
            <FlexBox width={'100%'}>
              <CandidateReport />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box flex={1}>
                <RecruitmentTrends />
              </Box>
            </FlexBox>
          </Item>
        </Grid>
        <Grid item xs={8.8}>
          <Item>
            <RecruitmentApplication />
          </Item>
        </Grid>
        <Grid item xs={3.2}>
          <Item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CandidateConversationRateReport />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ReportScreen
