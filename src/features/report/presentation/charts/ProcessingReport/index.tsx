import { Box, Paper, styled } from '@mui/material'
import Chart from 'react-apexcharts'
import { Tiny12md } from 'shared/components/Typography'
import useGetProcessingReportOptions from './hooks/useGetProcessingReportOptions'
import { ReportFilter } from 'shared/schema/chart/report'
import useReportProcessingApplication from 'features/report/hooks/useReportProcessingApplication'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import ReactApexChart from 'react-apexcharts'
import generatePDF from 'react-to-pdf';
import { ProcessingRef } from '../../screen-sections/ApplicationReportModal'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
}))

type ProcessingProps = {
  filters: ReportFilter
}

function Processing(props: ProcessingProps, ref: Ref<ProcessingRef>) {
  const { filters } = props
  const { categories, series } = useReportProcessingApplication({ filters });
  const { options } = useGetProcessingReportOptions({ categories })
  const componentRef = useRef<ReactApexChart | null>(null);

  useImperativeHandle(ref, () => {
    return {
      onExport: () => generatePDF(componentRef, { filename: 'TREC_Application_report_Processing.pdf' }),
    };
  }, [ref]);

  return (
    <Item sx={{ width: '100%' }}>
      <Tiny12md color={'grey.500'}>
        Statistics on the interview schedules of candidates
      </Tiny12md>
      <Box ref={componentRef}>
        <Chart type="bar" options={options} height={256} series={series} />
      </Box>
    </Item>
  )
}

export default forwardRef(Processing)
