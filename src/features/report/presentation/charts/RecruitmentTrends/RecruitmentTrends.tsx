import { Box } from '@mui/material'
import Chart from 'react-apexcharts'
import FlexBox from 'shared/components/flexbox/FlexBox'
import TinySelected from 'shared/components/selected/TinySelected'
import { Tiny12, Tiny12md } from 'shared/components/Typography'
import useRecruitmentTrendsOptions from './hooks/useRecruitmentTrendsOptions'
import useGetRecruitmentTrends from './hooks/useGetRecruitmentTrends'
import { useState } from 'react'
import { ValueRangeDate } from 'shared/interfaces/date'
import dayjs from 'dayjs'
import RangeDateByQuarter from '../../components/date/range-date/RangeDateByQuarter'
import { ReportFilterPeriod } from 'shared/schema/chart/report'
import { handleFormatFilters } from 'features/report/shared/utils/utils'

const selectItems = [
  {
    value: 'month',
    title: 'Month',
  },
  {
    value: 'quarter',
    title: 'Quarter',
  },
  {
    value: 'week',
    title: 'Week',
  },
  {
    value: 'year',
    title: 'Year',
  },
]

export interface RecruitmentTrendFilters {
  value: ValueRangeDate | null
  filterType: ReportFilterPeriod
}

function RecruitmentTrends() {
  const defaultFilters: RecruitmentTrendFilters = {
    filterType: 'month',
    value: {
      from_date: dayjs().subtract(12, 'month'),
      to_date: dayjs(),
    },
  }
  const [filters, setFilters] =
    useState<RecruitmentTrendFilters>(defaultFilters)

  const { categories, isLoading, series, totalCandidate } =
    useGetRecruitmentTrends({
      filters: handleFormatFilters(filters),
    })

  const { options } = useRecruitmentTrendsOptions({
    categories,
  })

  function selectedType(value: ReportFilterPeriod) {
    setFilters((prev) => ({
      ...prev,
      filterType: value,
    }))
  }

  function onChange(value: ValueRangeDate | null) {
    setFilters((prev) => ({
      ...prev,
      value: value,
    }))
  }
  return (
    <Box position={'relative'}>
      <FlexBox width={'100%'} justifyContent={'flex-end'}>
        <FlexBox gap={1}>
          <TinySelected
            onChange={selectedType}
            value={filters.filterType}
            selectItems={selectItems}
          />
          <RangeDateByQuarter
            filterType={filters.filterType}
            onChange={onChange}
            value={filters.value}
          />
        </FlexBox>
      </FlexBox>
      {!isLoading && (
        <Chart type="bar" options={options} height={256} series={series} />
      )}
      <FlexBox position={'absolute'} bottom={20} right={0} gap={'5px'}>
        <Tiny12md color={'#4D607A'}>Total candidate</Tiny12md>
        <Tiny12 color={'#0B0E1E'}>{totalCandidate}</Tiny12>
      </FlexBox>
    </Box>
  )
}

export default RecruitmentTrends
