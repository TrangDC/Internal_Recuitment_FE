import useReportByTeamTable from 'features/report/hooks/useReportByTeamTable'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { columnsByTeam } from 'features/report/shared/utils/constants/column'
type ByHiringTeamTableProps = {}
function ByHiringTeamTable(props: ByHiringTeamTableProps) {
  const { useTableReturn } = useReportByTeamTable()
  const { columnTable } = useBuildColumnTable({
    actions: [],
    columns: columnsByTeam,
  })
  return <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
}

export default ByHiringTeamTable
