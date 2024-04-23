import { Box, Grid, styled } from '@mui/material'
import { H3, Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const DivField = styled(Box)(({ theme }) => ({  
  '& span': {
    width: '12px',
    fontWeight: 500,
    color: theme.palette.grey[500],
    lineHeight: '14.63px',
  },

  '& p': {
    color: theme.palette.grey[900],
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '15.85px',
  },
}))

const GeneralInformationField = () => {
  return (
    <DivWrapperField>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <H3>HARA NGUYEN</H3>
        </Grid>
        <Grid item xs={12}>
          <FlexBox gap={'60px'}>
            <DivField>
              <Span>Name</Span>
              <Tiny>Hara Nguyen</Tiny>
            </DivField>
            <DivField>
              <Span>Email</Span>
              <Tiny>haranguyen@techvify.com.vn</Tiny>
            </DivField>
            <DivField>
              <Span>Phone number</Span>
              <Tiny>+084 988666333</Tiny>
            </DivField>
            <DivField>
              <Span>DOB</Span>
              <Tiny>10/03/2024</Tiny>
            </DivField>
          </FlexBox>
        </Grid>
      </Grid>
    </DivWrapperField>
  )
}

export default GeneralInformationField
