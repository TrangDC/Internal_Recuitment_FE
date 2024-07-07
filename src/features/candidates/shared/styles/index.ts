import { Box, styled } from '@mui/material'

export const DivHeaderWrapper = styled('div')`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
`

export const DivFilter = styled('div')`
  display: flex;
  width: auto;
  flex-wrap: wrap;
  gap: 16px;
`

export const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))
