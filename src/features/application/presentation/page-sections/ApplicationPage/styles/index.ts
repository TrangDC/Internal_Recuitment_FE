import { Box, CircularProgress, SxProps, styled } from '@mui/material'
import { Span, Tiny12md } from 'shared/components/Typography'

export const TinyLink = styled(Tiny12md)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#1F84EB !important',
  cursor: 'pointer',
}))

export const CircularLoading = styled(CircularProgress)(({ theme }) => ({
  width: '25px !important',
  height: '25px !important',
}))

export const SpanHiringStatus = styled(Span)(({ theme }) => ({
  color: '#2A2E37 !important',
  lineHeight: '14.63px',
}))

export const sxIconSelected = (selected: boolean): SxProps => {
  return selected
    ? {
        '& rect': {
          stroke: '#4D607A',
        },
        '& path': {
          fill: '#4D607A',
        },
      }
    : {}
}

export const BoxDroppableJob = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  width: '100%',
  backgroundColor: '#F0F1F8',

  '&.collapse': {
    width: 'auto',
  },
}))
