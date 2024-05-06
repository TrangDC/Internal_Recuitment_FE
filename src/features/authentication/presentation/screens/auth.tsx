import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  TREC_ACCESS_TOKEN,
  TREC_REFRESH_TOKEN,
} from 'shared/constants/constants'
import useLocalStorage from 'shared/hooks/useLocalStorage'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const accessToken = useLocalStorage(
    TREC_ACCESS_TOKEN,
    searchParams.get(TREC_ACCESS_TOKEN)
  )
  const refreshToken = useLocalStorage(
    TREC_REFRESH_TOKEN,
    searchParams.get(TREC_REFRESH_TOKEN)
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken.data || !refreshToken.data) return;

    accessToken.storeData(accessToken.data)
    refreshToken.storeData(refreshToken.data)

    navigate('/dashboard/teams')
  }, [accessToken.data, refreshToken.data])

  return <div>AuthCallback</div>
}

export default AuthCallback
