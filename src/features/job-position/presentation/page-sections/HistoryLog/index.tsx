import HistoryLogAuditTrails from 'features/auditTrails/presentation/page-sections/HistoryLog'
import { useParams } from 'react-router-dom'

const HistoryLog = () => {
  const { id } = useParams()
  return <HistoryLogAuditTrails id={id as string} module="job_positions" />
}

export default HistoryLog
