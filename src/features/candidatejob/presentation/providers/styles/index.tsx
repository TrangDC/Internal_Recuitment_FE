import { Box, Button, styled } from '@mui/material'
import { Span, Text13md, Tiny12md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const DivWrapperProcess = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

export const SpanGenaration = styled(Span)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.primary[800],
  lineHeight: '18.29px',
}))

export const DivField = styled(Box)(({ theme }) => ({
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

export const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const DivAction = styled(Box)(({ theme }) => ({
  padding: '24px',
  width: '100%',
}))

export const DivActionWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const DivInformation = styled(FlexBox)(({ theme }) => ({
  padding: '24px',
  flexWrap: 'wrap',
  gap: '20px',
  borderRight: '1px solid',
  borderColor: theme.palette.grey[200],
}))

export const DivItemInformation = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const ButtonStatus = styled(Button)(({ theme }) => ({
  width: '100%',
}))

export const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

export const DivWrapperContainer = styled(DivContainerWrapper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  borderRadius: '8px',
}))

export const TextLabel = styled(Tiny12md)(({ theme }) => ({
  color: '#4D607A'
}))

export const TextValue = styled(Text13md)(({ theme }) => ({
  color: '##0B0E1E'
}))
