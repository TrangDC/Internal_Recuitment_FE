import { Box, Paper, styled } from '@mui/material'

export const ContainerLeft = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  borderBottomLeftRadius: '8px',
  borderTopLeftRadius: '8px',
  borderBottomRightRadius: '0px',
  borderTopRightRadius: '0px',
  boxShadow: '0px 2px 4px 0px #60617029',
  width: '300px',
  height: '100%',
}))

export const ContainerRight = styled(Paper)(({ theme }) => ({
  borderBottomLeftRadius: '0px',
  borderTopLeftRadius: '0px',
  borderBottomRightRadius: '8px',
  borderTopRightRadius: '8px',
  boxShadow: '0px 2px 4px 0px #60617029',
  width: '240px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

export const ContainerMain = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderTop: '0px !important',
  width: 'calc(100% - 240px - 300px)',
  borderRadius: '0px',
  borderLeft: '0px !important',
  borderRight: '0px !important',
}))

export const BoxCandidateInfor = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E3E6EB',
  borderRadius: '8px',
  padding: '16px',
  width: '100%',
}))
