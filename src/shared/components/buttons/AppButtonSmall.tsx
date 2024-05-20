import { ButtonProps, styled } from '@mui/material'
import AppButton from './AppButton'

const AppButtonSmallStyled = styled(AppButton)(() => ({
  padding: '5px 10px 5px 8px !important',
  height: '26px',
}))

function AppButtonSmall({ children, ...props }: ButtonProps) {
  return <AppButtonSmallStyled {...props}>{children}</AppButtonSmallStyled>
}
export default AppButtonSmall
