import HistoryLogAuditTrails from 'features/auditTrails/presentation/page-sections/HistoryLog'

interface Props {
  id: string
}

const HistoryLog = ({id}: Props) => {
  return <HistoryLogAuditTrails module='email_templates' id={id}/>
}

export default HistoryLog