import CandidateList from './CandidateList'
import CandidateJob from './CandidateJob'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { useMemo } from 'react'

const RenderListByPage = () => {
  const { action_filter } = useContextChangeStatus()
  const { useFilterReturn } = action_filter
  const { dataFilterWithValue } = useFilterReturn

  const page_job = useMemo(() => {
    return dataFilterWithValue.page_job
  }, [JSON.stringify(dataFilterWithValue)])

  switch (page_job) {
    case 'list_job':
      return <CandidateList />
    case 'candidate_job':
      return <CandidateJob />
    default:
      return null
  }
}

export default RenderListByPage
