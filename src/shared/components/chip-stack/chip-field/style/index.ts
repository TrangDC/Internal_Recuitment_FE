import styled from '@emotion/styled'
import { Chip } from '@mui/material'

export const ChipComponent = styled(Chip)(({ theme }) => ({
  backgroundColor: '#E0F1FD',
  fontSize: '14px',
  color: '#121625',
  lineHeight: '21px',
  fontWeight: 500,
  marginRight: 0.5,
  marginBottom: 0.5,
  '& span': {
    width: '100%',
  },
}))
