import CandidateList from './CandidateList'
import CandidateJob from './CandidateJob'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { useMemo } from 'react'
import { OPENING_PAGE_APPLICATION } from 'features/application/shared/constants'

const RenderListByPage = () => {
  const { action_filter } = useContextChangeStatus()
  const { useFilterReturn } = action_filter
  const { dataFilterWithValue } = useFilterReturn

  const page_job = useMemo(() => {
    return dataFilterWithValue.page_job
  }, [JSON.stringify(dataFilterWithValue)])

  switch (page_job) {
    case OPENING_PAGE_APPLICATION.list_candidate:
      return <CandidateList />
    case OPENING_PAGE_APPLICATION.kanban:
      return <CandidateJob />
    default:
      return <CandidateList />
  }
}

export default RenderListByPage
