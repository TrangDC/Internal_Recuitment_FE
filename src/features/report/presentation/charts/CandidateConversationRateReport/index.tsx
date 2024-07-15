import { useState } from 'react'
import TinyButton from 'shared/components/buttons/TinyButton'
import FunnelChart from 'shared/components/chats/funnelChart'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text14sb } from 'shared/components/Typography'
import useGetCandidateConversationRateReport from './hooks/useGetCandidateConversationRateReport'
import { Box } from '@mui/material'
import TinySelected from 'shared/components/selected/TinySelected'
import { ValueRangeDate } from 'shared/interfaces/date'
import dayjs from 'dayjs'
import { PeriodFilter } from 'shared/schema/chart/report'
import { handleFormatFilters } from 'features/report/shared/utils/utils'
import CandidateConversionRateReportModal from '../../screen-sections/CandidateConversionRateReportModal'
import RangeDateByQuarter from '../../components/date/range-date/RangeDateByQuarter'
import { handleFormatLabelDate } from '../../components/date/range-date/utils'

const selectItems = [
  {
    value: 'all',
    title: 'All',
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
    value: 'week',
    title: 'Week',
  },
  {
    value: 'year',
    title: 'Year',
  },
]

export interface CandidateConversationFilters {
  value: ValueRangeDate | null
  filterType: PeriodFilter
}

function CandidateConversationRateReport() {
  const [open, setOpen] = useState(false)
  const defaultFilters: CandidateConversationFilters = {
    filterType: 'all',
    value: {
      from_date: dayjs().subtract(12, 'month'),
      to_date: dayjs(),
    },
  }
  const [filters, setFilters] =
    useState<CandidateConversationFilters>(defaultFilters)
  const reportFilter = handleFormatFilters(filters)
  const { series } = useGetCandidateConversationRateReport({
    filters: reportFilter,
  })
  const labels = [
    {
      color: '#FFAF46',
      title: 'Applied',
    },
    {
      color: '#DB4E82',
      title: 'Interviewing',
    },
    {
      color: '#2499EF',
      title: 'Offering',
    },
    {
      color: '#7874FE',
      title: 'Hired',
    },
  ]

  function handleOpenModal() {
    setOpen(true)
  }

  function selectedType(value: PeriodFilter) {
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
  const labelBy = filters.value
    ? handleFormatLabelDate(filters.filterType, filters.value)
    : ''
  return (
    <Box width={'100%'}>
      <FlexBox
        width={'100%'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Text14sb color={'grey.900'} marginBottom={2}>
          Candidate conversion rate report
        </Text14sb>
        <FlexBox gap={1}>
          <TinyButton onClick={handleOpenModal}>See more</TinyButton>
        </FlexBox>
      </FlexBox>
      <FlexBox gap={1}>
        <TinySelected
          onChange={selectedType}
          value={filters.filterType}
          selectItems={selectItems}
        />
        {filters.filterType !== 'all' && (
          <RangeDateByQuarter
            filterType={filters.filterType}
            onChange={onChange}
            value={filters.value}
          />
        )}
      </FlexBox>
      <FunnelChart funnelStep={series} labels={labels} width={200} />
      {open && (
        <CandidateConversionRateReportModal
          open={open}
          setOpen={setOpen}
          filters={reportFilter}
          labelBy={labelBy}
        />
      )}
    </Box>
  )
}

export default CandidateConversationRateReport
