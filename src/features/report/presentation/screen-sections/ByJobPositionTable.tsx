import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { columnsByJobPosition } from 'features/report/shared/utils/constants/column'
import useReportByTeamJobPosition from 'features/report/hooks/useReportByJobPosition'
type ByJobPositionTableProps = {}
function ByJobPositionTable(props: ByJobPositionTableProps) {
  const { useTableReturn } = useReportByTeamJobPosition()
  const { columnTable } = useBuildColumnTable({
    actions: [],
    columns: columnsByJobPosition,
  })
  return <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
}

export default ByJobPositionTable