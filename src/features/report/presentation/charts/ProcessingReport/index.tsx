import { Paper, styled } from '@mui/material'
import Chart from 'react-apexcharts'
import { Tiny12md } from 'shared/components/Typography'
import useGetProcessingReportOptions from './hooks/useGetProcessingReportOptions'
import { ReportFilter } from 'shared/schema/chart/report'
import useReportProcessingApplication from 'features/report/hooks/useReportProcessingApplication'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
}))

type ProcessingProps = {
  filters: ReportFilter
}

function Processing(props: ProcessingProps) {
  const { filters } = props
  const { categories, series } = useReportProcessingApplication({ filters });
  const { options } = useGetProcessingReportOptions({ categories })

  return (
    <Item sx={{ width: '100%' }}>
      <Tiny12md color={'grey.500'}>
      Statistics on the interview schedules of candidates 
      </Tiny12md>
      <Chart type="bar" options={options} height={256} series={series} />
    </Item>
  )
}

export default Processing
