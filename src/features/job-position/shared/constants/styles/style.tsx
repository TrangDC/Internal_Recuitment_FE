import { Box, styled } from '@mui/material'
import { Span } from 'shared/components/Typography'

export const BoxWrapperContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
}))

export const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

export const SpanGenaration = styled(Span)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.primary[800],
  lineHeight: '18.29px',
}))

export const DivWrapperProcess = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

