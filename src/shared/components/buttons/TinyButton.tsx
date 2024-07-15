import { Button, ButtonProps, styled } from '@mui/material'

const TinyButtonStyled = styled(Button)(() => ({
  height: '26px',
  padding: '5px 10px 5px 10px',
  borderColor: '#88CDFF',
  borderRadius: '4px',
  backgroundColor: '#F1F9FF',
  color: '#1F84EB',
  fontSize: '13px',
  fontWeight: 600,
}))

function TinyButton(props: ButtonProps) {
  return (
    <TinyButtonStyled
      size="small"
      variant="outlined"
      {...props}
    ></TinyButtonStyled>
  )
}
export default TinyButton
