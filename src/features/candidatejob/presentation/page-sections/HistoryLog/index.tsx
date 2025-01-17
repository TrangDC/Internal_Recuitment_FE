import HistoryLogAuditTrails from 'features/auditTrails/presentation/page-sections/HistoryLog'
import { useParams } from 'react-router-dom'

const HistoryLog = () => {
  const { id } = useParams()
  return <HistoryLogAuditTrails module='candidates' id={id as string}/>
}

export default HistoryLog