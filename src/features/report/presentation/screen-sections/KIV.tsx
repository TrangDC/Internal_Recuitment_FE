import TableFailedReason, {
  FailedReasonDataTable,
} from '../components/TableFailedReason'

const KIVColumns = [
  {
    id: 'Failed reason',
    name: 'Failed reason',
  },
  {
    id: 'Number of failed reason',
    name: 'Number of failed reason',
  },
  {
    id: 'Percentage (%)',
    name: 'Percentage (%)',
  },
]

type KIVProps = {
  data: FailedReasonDataTable[]
}

function KIV(props: KIVProps) {
  const { data } = props
  return <TableFailedReason data={data} columns={KIVColumns} />
}

export default KIV
