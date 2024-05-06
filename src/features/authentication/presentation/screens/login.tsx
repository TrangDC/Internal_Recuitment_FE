import { ButtonBase, styled } from '@mui/material'
import AuthenticationLayout from 'features/authentication/presentation/page-sections/AuthenticationLayout'
import { FC } from 'react'
import { handleSignIn } from 'services/authUtil'
import IsLogin from 'shared/hoc/IsLogin'

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  padding: 12,
  marginBottom: 16,
  borderRadius: '8px',
  fontWeight: '500',
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down(454)]: { width: '100%', marginBottom: 8 },
}))

const Login: FC = () => {

  return (
    <AuthenticationLayout title="Sign in to TREX">
      <StyledButton onClick={handleSignIn}>Signin with Azure</StyledButton>
    </AuthenticationLayout>
  )
}

export default IsLogin(Login)
