import useReportByTeamTable from 'features/report/hooks/useReportByTeamTable'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { columnsByTeam } from 'features/report/shared/utils/constants/column'
import { Box } from '@mui/material'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import generatePDF from 'react-to-pdf'
import { ProcessingRef } from './CandidateConversionRateReportModal'
type ByHiringTeamTableProps = {}
function ByHiringTeamTable(props: ByHiringTeamTableProps, ref: Ref<ProcessingRef>) {
  const { useTableReturn } = useReportByTeamTable()
  const { columnTable } = useBuildColumnTable({
    actions: [],
    columns: columnsByTeam,
  })

  const componentRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      onExport: () => generatePDF(componentRef, { filename: 'TREC_Candidate_conversion_by_hiring_team.pdf' }),
    };
  }, [ref]);

  return <Box width={'100%'} ref={componentRef}>
    <CustomTable columns={columnTable} useTableReturn={useTableReturn} showPagination={false}/>
  </Box>
}

export default forwardRef(ByHiringTeamTable)
