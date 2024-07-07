import { Box, styled } from '@mui/material'

export const DivHeaderWrapper = styled('div')`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
`

export const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))
