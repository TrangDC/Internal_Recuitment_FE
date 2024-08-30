import ListAllJob from './ListAllJob'
import AllJobKanban from './AllJobKanban'
import { useContextKanbanJob } from '../context/KanbanJobContext'
import { useMemo } from 'react'
import { VIEW_PAGE_JOB } from 'features/jobs/shared/constants'

const RenderListByPage = () => {
  const { action_filter } = useContextKanbanJob()
  const { useFilterReturn } = action_filter
  const { dataFilterWithValue } = useFilterReturn

  const page_job = useMemo(() => {
    return dataFilterWithValue.page_job
  }, [JSON.stringify(dataFilterWithValue)])

  switch (page_job) {
    case VIEW_PAGE_JOB.list_all_job:
      return <ListAllJob />
    case VIEW_PAGE_JOB.list_job_kanban:
      return <AllJobKanban />
    default:
      return null
  }
}

export default RenderListByPage
