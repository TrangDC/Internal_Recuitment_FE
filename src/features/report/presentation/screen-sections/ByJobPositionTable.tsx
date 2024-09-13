import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { columnsByJobPosition } from 'features/report/shared/utils/constants/column'
import useReportByTeamJobPosition from 'features/report/hooks/useReportByJobPosition'
import { Box } from '@mui/material'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import generatePDF from 'react-to-pdf'
import { ProcessingRef } from './CandidateConversionRateReportModal'
type ByJobPositionTableProps = {}
function ByJobPositionTable(props: ByJobPositionTableProps, ref: Ref<ProcessingRef>) {
  const { useTableReturn } = useReportByTeamJobPosition()
  const { columnTable } = useBuildColumnTable({
    actions: [],
    columns: columnsByJobPosition,
  })

  const componentRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      onExport: () => generatePDF(componentRef, { filename: 'TREC_Candidate_conversion_by_job_position.pdf' }),
    };
  }, [ref]);

  return <Box width={'100%'} ref={componentRef}>
  <CustomTable columns={columnTable} useTableReturn={useTableReturn} showPagination={false}/>
</Box>
}

export default forwardRef(ByJobPositionTable)