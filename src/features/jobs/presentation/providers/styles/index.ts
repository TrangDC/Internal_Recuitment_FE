import { Box, styled } from '@mui/material'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const DivHeaderWrapper = styled('div')`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
`

export const DivFilter = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`

export const DivWrapperProcess = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
}))

export const SpanHiring = styled(Span)(({ theme }) => ({
  fontSize: '15px',
  color: '#00508A',
  lineHeight: '18.29px',
  fontWeight: 500,
}))

export const DivField = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
}))

export const BoxTitle = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: '10px',

  '& span': {
    fontSize: '12px',
    color: theme.palette.grey[600],
    fontWeight: 600,
  },
}))

export const BoxField = styled(FlexBox)(({ theme }) => ({
  padding: '6px',
  flexWrap: 'wrap',
  gap: '6px',
  minHeight: '65px',
}))

export const BoxFieldContainer = styled(Box)(({ theme }) => ({
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

