import { Box } from '@mui/material'
import Chart from 'react-apexcharts'
import FlexBox from 'shared/components/flexbox/FlexBox'
import TinySelected from 'shared/components/selected/TinySelected'
import { Tiny12, Tiny12md } from 'shared/components/Typography'
import useRecruitmentTrendsOptions from './hooks/useRecruitmentTrendsOptions'
import useGetRecruitmentTrends from './hooks/useGetRecruitmentTrends'
import { useState } from 'react'
import { ValueRangeDate } from 'shared/interfaces/date'
import dayjs, { Dayjs } from 'dayjs'
import RangeDateByCategory from '../../components/date/range-date/RangeDateByCategory'
import { ReportFilterPeriod } from 'shared/schema/chart/report'
import {
  handleChangeFilterType,
  handleFormatFilters,
} from 'features/report/shared/utils/utils'
import { handleCheckDateChange } from '../../components/date/range-date/utils'

const selectItems = [
  {
    value: 'week',
    title: 'Week',
  },
  {
    value: 'month',
    title: 'Month',
  },
  {
    value: 'quarter',
    title: 'Quarter',
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
      from_date: dayjs().subtract(11, 'month'),
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
    totalCandidate: totalCandidate,
  })

  function selectedType(value: ReportFilterPeriod) {
    setFilters((prev) => {
      const data = handleChangeFilterType({
        ...prev,
        filterType: value,
      })
      return data
    })
  }

  function handleToChange(value: Dayjs | null) {
    setFilters((prev) => {
      if (!value) return prev
      const newValue = handleCheckDateChange(prev.filterType, {
        from_date: prev.value?.from_date ?? null,
        to_date: value,
      })
      return {
        ...prev,
        value: newValue,
      }
    })
  }

  function handleFromChange(value: Dayjs | null) {
    setFilters((prev) => {
      return {
        ...prev,
        value: {
          to_date: prev.value?.to_date ?? null,
          from_date: value,
        },
      }
    })
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
          <RangeDateByCategory
            filterType={filters.filterType}
            onFromChange={handleFromChange}
            onToChange={handleToChange}
            value={filters.value}
          />
        </FlexBox>
      </FlexBox>
      {!isLoading && (
        <Chart type="bar" options={options} height={256} series={series} />
      )}
      {categories.length > 0 && (
        <FlexBox position={'absolute'} bottom={20} right={0} gap={'5px'}>
          <Tiny12md color={'#4D607A'}>Total candidate</Tiny12md>
          <Tiny12 color={'#0B0E1E'}>{totalCandidate}</Tiny12>
        </FlexBox>
      )}
    </Box>
  )
}

export default RecruitmentTrends
