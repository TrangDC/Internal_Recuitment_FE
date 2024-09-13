import { ReportFilter } from 'shared/schema/chart/report'
import TableFailedReason, {
} from '../components/TableFailedReason'
import useReportFailedApplication from 'features/report/hooks/useReportFailedApplication'

const KIVColumns = [
  {
    id: 'Failed reason',
    name: 'Failed reason',
  },
  {
    id: 'Total',
    name: 'Total',
  },
  {
    id: 'Failed CV',
    name: 'Failed CV',
  },
  {
    id: 'Failed Interview',
    name: 'Failed Interview',
  },
  {
    id: 'Offered lost',
    name: 'Offered lost',
  },
]

type KIVProps = {
  filters: ReportFilter
}

function Failed(props: KIVProps) {
  const { filters } = props

  const { failedDataFormat, failedTotal } = useReportFailedApplication({ filters });
  return <TableFailedReason data={failedDataFormat} columns={KIVColumns} total={failedTotal} />
}

export default Failed
