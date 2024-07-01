import { styled } from '@mui/material'
import { Tiny12md } from 'shared/components/Typography'

export const TinyLink = styled(Tiny12md)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#1F84EB !important',
  cursor: 'pointer'
}))
