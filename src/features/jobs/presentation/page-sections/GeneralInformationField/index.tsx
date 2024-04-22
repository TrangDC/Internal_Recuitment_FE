import { Box, Grid, styled } from '@mui/material'
import { Span, Tiny } from 'shared/components/Typography'

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  //@ts-ignore
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const DivField = styled(Box)(({ theme }) => ({
  width: '100%',

  '& span': {
    width: '12px',
    fontWeight: 500,
    //@ts-ignore
    color: theme.palette.grey[500],
    lineHeight: '14.63px',
  },

  '& p': {
    //@ts-ignore
    color: theme.palette.grey[900],
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '15.85px',
  },
}))

const GeneralInformationField = () => {
  return (
    <DivWrapperField>
      <Grid container spacing={2} xs={12}>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Job name</Span>
            <Tiny>Software Enginneer</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Team</Span>
            <Tiny>D2</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Location</Span>
            <Tiny>Ha Noi</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Requester</Span>
            <Tiny>David</Tiny>
          </DivField>
        </Grid>

        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Salary</Span>
            <Tiny>Range: 20,000,000 - 30,000,000</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>Staff required</Span>
            <Tiny>2</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12}>
          <DivField>
            <Span>Description</Span>
            <Tiny>
              Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut nulla
              torquent pulvinar cursus pellentesque lectus posuere est per eget
              inceptos adipiscing nibh odio felis ultricies urna fermentum
              ridiculus dolor class potenti
            </Tiny>
          </DivField>
        </Grid>
      </Grid>
    </DivWrapperField>
  )
}

export default GeneralInformationField
