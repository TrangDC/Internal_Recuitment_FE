import TableFailedReason, {
  FailedReasonDataTable,
} from '../components/TableFailedReason'

const OfferedLostColumns = [
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

type OfferedLostProps = {
  data: FailedReasonDataTable[]
}

function OfferedLost(props: OfferedLostProps) {
  const { data } = props
  return <TableFailedReason data={data} columns={OfferedLostColumns} />
}

export default OfferedLost
