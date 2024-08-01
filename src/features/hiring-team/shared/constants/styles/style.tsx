import { Box, styled } from '@mui/material'
import AppButton from 'shared/components/buttons/AppButton'

export const BoxWrapperContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

export const ButtonAdd = styled(AppButton)(({ theme }) => ({
  padding: '5px 10px 5px 8px',
  height: '26px',
  gap: '4px'
}))
