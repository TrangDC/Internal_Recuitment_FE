import React, { ComponentType, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TREC_ACCESS_TOKEN } from 'shared/constants/constants'
import { handleLocalStorage } from 'shared/utils/utils'

const routeNotLogin = [
  '/login'
]

const IsLogin = <P extends object>(Component: ComponentType<P>) => {
  const WithLoginComponent: React.FC<P> = (props) => {
    const navigate = useNavigate()

    const location = useLocation();

    const { getStatusByKey } = handleLocalStorage()
    const accessToken = getStatusByKey(TREC_ACCESS_TOKEN)

    useEffect(() => {
      //Redirect users to the home page when logging in
      if (accessToken && routeNotLogin.includes(location.pathname)) {
        navigate('/')
      }

      //redirect users to the login page when not logged in
      if(!accessToken && !routeNotLogin.includes(location.pathname)) {
        navigate('/login')
      }
    }, [accessToken, location.pathname])

    return <Component {...props} />
  }

  return WithLoginComponent
}

export default IsLogin
