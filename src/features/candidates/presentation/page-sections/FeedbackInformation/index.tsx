import { Box, Grid, styled } from '@mui/material'
import { H3, Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivField } from '../../providers/styles'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'

const BoxImage = styled(Box)(({ theme }) => ({
  width: '140px',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '198px',
}))

const FeedbackInformation = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={10}>
        <FlexBox flexDirection={'column'} gap={'20px'}>
          <FlexBox gap={'10px'} alignItems={'center'}>
            <H3>HARA NGUYEN</H3>
            <ChipFieldStatus
              label="Accepted"
              style={{
                backgroundColor: '#20A4A9',
                color: 'white',
              }}
            />
          </FlexBox >

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DivField>
                <Span>Full name</Span>
                <Tiny>Nguyen Thi Nhu Quynh</Tiny>
              </DivField>
            </Grid>
            <Grid item xs={6}>
              <DivField>
                <Span>Job applied</Span>
                <Tiny>UI/UX Designer</Tiny>
              </DivField>
            </Grid>
            <Grid item xs={6}>
              <DivField>
                <Span>Interviewr</Span>
                <Tiny>Durin Nguyen, Arianne Bui, Helena Nguyen</Tiny>
              </DivField>
            </Grid>
            <Grid item xs={6}>
              <DivField>
                <Span>Applicant's Phone Number</Span>
                <Tiny>+84 966 123456</Tiny>
              </DivField>
            </Grid>
            <Grid item xs={6}>
              <DivField>
                <Span>Applied on</Span>
                <Tiny>10:30 AM, 10/03/2024</Tiny>
              </DivField>
            </Grid>
            <Grid item xs={6}>
              <DivField>
                <Span>Interviewd on</Span>
                <Tiny>10:30 AM, 10/03/2024</Tiny>
              </DivField>
            </Grid>
          </Grid>
        </FlexBox>
      </Grid>
      <Grid item xs={12} md={2}>
        <BoxImage>{/* image */}</BoxImage>
      </Grid>
    </Grid>
  )
}

export default FeedbackInformation
