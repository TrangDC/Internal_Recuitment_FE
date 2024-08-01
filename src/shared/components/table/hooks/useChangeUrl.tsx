import { useLocation } from 'react-router-dom'
import { IPagination } from './useCustomTable'
import { useEffect } from 'react'

function useChangeUrl(pagination: IPagination) {
  const location = useLocation()
  function changeUrl(page: number, perPage: number) {
    const newUrl = `${location.pathname}?page=${page}&perPage=${perPage}`
    window.history.replaceState(null, '', newUrl)
  }
  useEffect(() => {
    changeUrl(pagination.page, pagination.perPage)
  }, [pagination])
}

export default useChangeUrl
