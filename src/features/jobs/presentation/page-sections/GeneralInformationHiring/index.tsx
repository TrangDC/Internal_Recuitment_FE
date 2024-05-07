import { Box, Grid, styled } from '@mui/material'
import React from 'react'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

const DivWrapperProcess = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
}))

const SpanHiring = styled(Span)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.primary[800],
  lineHeight: '18.29px',
}))

const DivField = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
}))

const BoxTitle = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: '10px',

  '& span': {
    fontSize: '12px',
    color: theme.palette.grey[600],
    fontWeight: 600,
  },
}))

const BoxField = styled(FlexBox)(({ theme }) => ({
  padding: '6px',
  flexWrap: 'wrap',
  gap: '6px'
}))

const BoxFieldContainer = styled(Box)(({ theme }) => ({
    width: '100%',
  backgroundColor: theme.palette.primary[50],
  padding: '8px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.grey[200]}`,

  '& span': {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '14.63px',
    color: theme.palette.grey[600],
  },

  '& p': {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14.63px',
    color: theme.palette.grey[500],
  },
}))

const GenaralInformationHiring = () => {
  return (
    <DivWrapperProcess>
      <Box>
        <SpanHiring>Hiring process</SpanHiring>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>Application 1</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>

          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>Interviewing 1</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>
          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>Offering 0</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>
          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>KIV 1</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>
          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>Offerlost 1</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>
          <Grid item xs={12} md={2}>
            <DivField>
              <BoxTitle>
                <Span>Ex-staff 1</Span>
              </BoxTitle>
              <BoxField>
                <BoxFieldContainer>
                  <Span>Nguyen Nhu Quynh</Span>
                  <Tiny>0988 555 666</Tiny>
                </BoxFieldContainer>
              </BoxField>
            </DivField>
          </Grid>
        </Grid>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
