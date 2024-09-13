import { ReportFilter } from 'shared/schema/chart/report'
import TableFailedReason, {
} from '../components/TableFailedReason'
import useReportFailedApplication from 'features/report/hooks/useReportFailedApplication'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import generatePDF from 'react-to-pdf'
import { ProcessingRef } from './ApplicationReportModal'
import { Box } from '@mui/material'

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

function Failed(props: KIVProps, ref: Ref<ProcessingRef>) {
  const { filters } = props
  const componentRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      onExport: () => generatePDF(componentRef, { filename: 'TREC_Application_report_Failed.pdf' }),
    };
  }, [ref]);

  const { failedDataFormat, failedTotal } = useReportFailedApplication({ filters });
  return <Box ref={componentRef} width={'100%'}>
    <TableFailedReason data={failedDataFormat} columns={KIVColumns} total={failedTotal} />
  </Box>
}

export default forwardRef(Failed)
