import { Box, Paper, styled } from '@mui/material'

export const ContainerLeft = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  borderBottomLeftRadius: '8px',
  borderTopLeftRadius: '8px',
  borderBottomRightRadius: '0px',
  borderTopRightRadius: '0px',
  width: '300px',
  height: '100%',
}))

export const Container = styled(Paper)(({}) => ({
  width: '100%',
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  height: '80vh',
  boxShadow: '0px 2px 4px 0px #60617029',
}))

export const ContainerRight = styled(Box)(({ theme }) => ({
  borderBottomLeftRadius: '0px',
  borderTopLeftRadius: '0px',
  borderBottomRightRadius: '8px',
  borderTopRightRadius: '8px',
  width: '240px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

export const ContainerMain = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderTop: '0px !important',
  width: 'calc(100% - 240px - 300px)',
  borderRadius: '0px',
}))

export const BoxCandidateInfor = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E3E6EB',
  borderRadius: '8px',
  padding: '16px',
  width: '100%',
}))
