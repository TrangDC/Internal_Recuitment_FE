import { Box } from '@mui/material'
import Chart from 'react-apexcharts'
import { Text14sb, Tiny12, Tiny12md } from 'shared/components/Typography'
import useGetCandidateReport from './hooks/useGetCandidateReport'
import useCandidateReportOptions from './hooks/useCandidateReportOptions'
import FlexBox from 'shared/components/flexbox/FlexBox'
function CandidateReport() {
  const { series, informationActive, informationBlackList, labels } =
    useGetCandidateReport()
  const options = useCandidateReportOptions(labels)
  return (
    <Box width={320}>
      <Text14sb color={'grey.900'} marginBottom={2}>
        Candidate report
      </Text14sb>
      <FlexBox
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Chart
          options={options}
          height={256}
          width={280}
          type="donut"
          series={series}
        />
        <FlexBox alignItems={'center'} gap={2}>
          <FlexBox justifyContent={'center'} gap={'5px'}>
            <Tiny12md color={'grey.500'}>Active</Tiny12md>
            <Tiny12 fontWeight={600}>
              {informationActive.number} ({`${informationActive.percentage}%`})
            </Tiny12>
          </FlexBox>
          <FlexBox justifyContent={'center'} gap={'5px'}>
            <Tiny12md color={'grey.500'}>Blacklist</Tiny12md>
            <Tiny12 fontWeight={600}>
              {informationBlackList.number} (
              {`${informationBlackList.percentage}%`})
            </Tiny12>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Box>
  )
}

export default CandidateReport
