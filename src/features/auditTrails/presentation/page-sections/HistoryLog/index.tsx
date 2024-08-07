import {
  HistoryWrapper,
} from '../../providers/styles'
import AuditTrailsProvider from '../../providers/context'
import FilterAuditTrails from './FilterAuditTrail'
import ViewAuditTrails from './ViewAuditTrail'

export type ModuleAuditTrails = 'hiring_teams'
| 'hiring_jobs'
| 'candidates'
| 'skills'
| 'email_templates'
| 'users'
| 'skill_types'
| 'roles'
| 'job_positions'
| 'rec_teams'
interface Props {
  module: ModuleAuditTrails
  id: string
}

const HistoryLogAuditTrails = ({ module, id }: Props) => {
  return (
    <AuditTrailsProvider id={id} module={module}>
      <HistoryWrapper>
        <FilterAuditTrails />
        <ViewAuditTrails />
      </HistoryWrapper>
    </AuditTrailsProvider>
  )
}

export default HistoryLogAuditTrails
