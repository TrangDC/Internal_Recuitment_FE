import { Dispatch, SetStateAction, useEffect } from 'react'
import { IPagination } from './useCustomTable'

type UseUpdateStateTableByUrlProps = {
  setPagination: Dispatch<SetStateAction<IPagination>>
}

function useUpdateStateTableByUrl(props: UseUpdateStateTableByUrlProps) {
  const { setPagination } = props
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const page = Number(urlParams.get('page')) ?? 1
    const perPage = Number(urlParams.get('perPage')) ?? 10
    setPagination((prev) => ({
      ...prev,
      perPage: perPage,
      page: page,
      state: 'RUNNING',
    }))
  }, [])
}

export default useUpdateStateTableByUrl
