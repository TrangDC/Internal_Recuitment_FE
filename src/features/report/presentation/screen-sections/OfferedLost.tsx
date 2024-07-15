import { CandidateJobByFailedReason } from 'shared/schema/chart/report'
import TableFailedReason from '../components/TableFailedReason'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { getPercentage } from 'shared/utils/convert-string'
import _ from 'lodash'

const offeredLostData = [
  {
    name: 'Weak technical skills',
    numberOfFailedReason: 52,
    percentage: '20%',
  },
  {
    name: 'Poor interpersonal skills',
    numberOfFailedReason: 50,
    percentage: '18%',
  },
  {
    name: 'Poor problem-solving skills',
    numberOfFailedReason: 45,
    percentage: '12%',
  },
  {
    name: 'Poor management skills',
    numberOfFailedReason: 42,
    percentage: '10%',
  },

  {
    name: 'Candidate withdrawal',
    numberOfFailedReason: 40,
    percentage: '9%',
  },
  {
    name: 'Others',
    numberOfFailedReason: 38,
    percentage: '8%',
  },
]

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
  data: CandidateJobByFailedReason[]
}

function OfferedLost(props: OfferedLostProps) {
  const { data } = props
  const { t } = useTranslation()
  const { offeredLostData } = useMemo(() => {
    const total = data.reduce((t: number, a) => t + a.amount, 0)
    const offeredLostData = data.map((item) => ({
      name: t(item.failed_reason),
      numberOfFailedReason: item.amount,
      percentage: `${getPercentage(item.amount, total)}%`,
    }))
    const sortData = _.orderBy(offeredLostData, 'numberOfFailedReason', 'desc')
    return {
      total,
      offeredLostData: sortData,
    }
  }, [data])
  return (
    <TableFailedReason data={offeredLostData} columns={OfferedLostColumns} />
  )
}

export default OfferedLost
