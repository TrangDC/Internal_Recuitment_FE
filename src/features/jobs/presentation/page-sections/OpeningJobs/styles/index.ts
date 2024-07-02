import { CircularProgress, styled } from '@mui/material'
import { Tiny12md } from 'shared/components/Typography'

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
