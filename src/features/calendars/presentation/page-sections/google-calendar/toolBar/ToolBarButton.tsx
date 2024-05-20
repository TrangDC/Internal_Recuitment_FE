import { Button, ButtonProps, styled } from '@mui/material'

const StyledButton = styled(Button)(() => ({
  padding: '5px 20px 5px 20px',
  borderRadius: '4px',
}))

function ToolBarButton(props: ButtonProps) {
  const { children } = props
  return <StyledButton {...props}>{children}</StyledButton>
}
export default ToolBarButton
