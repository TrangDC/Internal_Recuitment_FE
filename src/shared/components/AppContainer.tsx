import { Card, CardProps, styled } from '@mui/material'

const CardStyled = styled(Card)(() => ({
  borderBottom: '1px solid #E3E6EB',
  padding: '20px',
  boxShadow: '0px 2px 4px 0px #60617029',
}))

function AppContainer(props: CardProps) {
  return <CardStyled {...props}></CardStyled>
}

export default AppContainer
