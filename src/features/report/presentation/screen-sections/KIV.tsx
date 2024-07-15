import { CandidateJobByFailedReason } from 'shared/schema/chart/report'
import TableFailedReason from '../components/TableFailedReason'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getPercentage } from 'shared/utils/convert-string'
import _ from 'lodash'

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
  data: CandidateJobByFailedReason[]
}

function KIV(props: KIVProps) {
  const { data } = props
  const { t } = useTranslation()
  const { KIVData } = useMemo(() => {
    const total = data.reduce((t: number, a) => t + a.amount, 0)
    const KIVData = data.map((item) => ({
      name: t(item.failed_reason),
      numberOfFailedReason: item.amount,
      percentage: `${getPercentage(item.amount, total)}%`,
    }))
    const sortData = _.orderBy(KIVData, 'numberOfFailedReason', 'desc')
    console.log('sortData', sortData)
    return {
      total,
      KIVData: sortData,
    }
  }, [data])
  return <TableFailedReason data={KIVData} columns={KIVColumns} />
}

export default KIV
