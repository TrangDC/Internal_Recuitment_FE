import { Box, styled } from '@mui/material'
import { Span, Tiny12md } from 'shared/components/Typography'
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

export const BoxContainerCandidate = styled(Box)(({ theme }) => ({
  minWidth: '240px',
  width: '240px',
  transition: 'all .3s',

  '&.collapse': {
    width: '45px',
    minWidth: '45px',
    writingMode: 'vertical-lr',
  },

  '&.collapse .box__title': {
    alignItems: 'baseline',
    flexDirection: 'row-reverse',
  },

  '&.collapse .action__collapse': {
    flexDirection: 'row-reverse',
  },
}))

export const BoxDroppableCandidate = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  backgroundColor: '#F0F1F8',
}))

export const BoxCandidateTitle = styled(Box)(({ theme }) => ({
  padding: '10px',

  '& span': {
    fontSize: '12px',
    color: theme.palette.grey[600],
    fontWeight: 600,
  },
}))

export const BoxFieldInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  padding: '10px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.grey[200]}`,

  '& p': {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14.63px',
    color: theme.palette.grey[500],
  },
}))

export const TinyInfo = styled(Tiny12md)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

export const SpanInfo = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  color: '#2A2E37',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
