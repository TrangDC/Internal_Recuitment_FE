import { ReportFilter } from 'shared/schema/chart/report'
import Chart from 'react-apexcharts'
import { Box } from '@mui/material'
import useGetReportHiredApplication from '../../hooks/useGetReportHiredApplication'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny12, Tiny12md } from 'shared/components/Typography'
import useGetReportHiredOptions from 'features/report/hooks/useGetReportHiredOptions'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import generatePDF from 'react-to-pdf'
import { ProcessingRef } from './ApplicationReportModal'

type HiredProps = {
  filters: ReportFilter
}

function Hired(props: HiredProps, ref: Ref<ProcessingRef>) {
  const { filters } = props
  const { isLoading, series, categories, totalHired } =
    useGetReportHiredApplication({
      filters: filters,
    })

  const { options } = useGetReportHiredOptions({
    categories,
  })

  const componentRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(ref, () => {
    return {
      onExport: () => generatePDF(componentRef, { filename: 'TREC_Application_report_Hired.pdf' }),
    };
  }, [ref]);

  return <Box position={'relative'} width={'100%'}>
    <Box width={'100%'} ref={componentRef}>
      {!isLoading && <Chart type="bar" options={options} height={285} series={series} />}
    </Box>
    {categories.length > 0 && (
      <FlexBox position={'absolute'} bottom={20} right={8} gap={'5px'} >
        <Tiny12md color={'#4D607A'}>Total</Tiny12md>
        <Tiny12 color={'#0B0E1E'}>{totalHired}</Tiny12>
      </FlexBox>
    )}
  </Box>
}

export default forwardRef(Hired)
