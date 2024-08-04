import { Paper, styled } from '@mui/material'
import Chart from 'react-apexcharts'
import { Tiny12md } from 'shared/components/Typography'
import useGetProcessingReportOptions from './hooks/useGetProcessingReportOptions'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
}))

type ProcessingProps = {
  data: number[]
}

function Processing(props: ProcessingProps) {
  const { data } = props
  const { options } = useGetProcessingReportOptions()
  const series: ApexAxisChartSeries = [
    {
      data: data,
      group: '1',
    },
  ]
  return (
    <Item sx={{ width: '100%' }}>
      <Tiny12md color={'grey.500'}>
        Statistics on the interview schedules for candidates whose applications
        are at the Applied and Interviewing stage
      </Tiny12md>
      <Chart type="bar" options={options} height={256} series={series} />
    </Item>
  )
}

export default Processing
