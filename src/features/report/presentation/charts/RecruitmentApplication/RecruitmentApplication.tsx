import { Box } from '@mui/material'
import Chart from 'react-apexcharts'
import FlexBox from 'shared/components/flexbox/FlexBox'
import TinySelected from 'shared/components/selected/TinySelected'
import { Text14sb, Tiny12, Tiny12md } from 'shared/components/Typography'
import { useState } from 'react'
import { ValueRangeDate } from 'shared/interfaces/date'
import dayjs, { Dayjs } from 'dayjs'
import useRecruitmentApplicationOptions from './hooks/useRecruitmentApplicationOptions'
import useGetRecruitmentApplication from './hooks/useGetRecruitmentApplication'
import TinyButton from 'shared/components/buttons/TinyButton'
import {
  handleChangeFilterType,
  handleFormatFilters,
} from 'features/report/shared/utils/utils'
import RangeDateByCategory from '../../components/date/range-date/RangeDateByCategory'
import ApplicationReportModal from '../../screen-sections/ApplicationReportModal'
import { ReportFilterPeriod } from 'shared/schema/chart/report'
import {
  handleCheckDateChange,
  handleFormatLabelDate,
} from '../../components/date/range-date/utils'
import useGetAllHiringTeam from './hooks/useGetAllHiringTeam'

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

function RecruitmentApplication() {
  const [open, setOpen] = useState(false)
  const defaultFilters: RecruitmentTrendFilters = {
    filterType: 'month',
    value: {
      from_date: dayjs().subtract(11, 'month'),
      to_date: dayjs(),
    },
  }
  const [filters, setFilters] =
    useState<RecruitmentTrendFilters>(defaultFilters)
  const filterReport = handleFormatFilters(filters)

  const [selectedTeam, setSelectedTeam] = useState('all');

  const { listHiringTeam } = useGetAllHiringTeam();
  const filterApplication = {
    ...filterReport,
    hiring_team_id: selectedTeam !== 'all' ? selectedTeam : undefined,
  }

  const { categories, isLoading, series, totalCandidate } =
    useGetRecruitmentApplication({
      filters: filterApplication,
    })

  const { options } = useRecruitmentApplicationOptions({
    categories,
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
  const labelBy = filters.value
    ? handleFormatLabelDate(filters.filterType, filters.value) 
    : ''
    const teamSelected = listHiringTeam.find((item) => item.value === selectedTeam)

  return (
    <Box position={'relative'}>
      <FlexBox width={'100%'} justifyContent={'space-between'}>
        <Text14sb color={'grey.900'} marginBottom={2}>
          Applicant report
        </Text14sb>
        <FlexBox gap={1}>
        <TinySelected
            onChange={(hiringTeam: string) => {
              setSelectedTeam(hiringTeam)
            }}
            value={selectedTeam}
            selectItems={listHiringTeam}
          />
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
          <TinyButton onClick={() => setOpen(true)}>See More</TinyButton>
        </FlexBox>
      </FlexBox>
      {!isLoading && (
        <Chart type="bar" options={options} height={285} series={series} />
      )}
      {/* {categories.length > 0 && (
        <FlexBox position={'absolute'} bottom={20} right={0} gap={'5px'}>
          <Tiny12md color={'#4D607A'}>Total applications</Tiny12md>
          <Tiny12 color={'#0B0E1E'}>{totalCandidate}</Tiny12>
        </FlexBox>
      )} */}
      {open && (
        <ApplicationReportModal
          filters={filterApplication}
          labelBy={labelBy}
          teamSelected={teamSelected}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Box>
  )
}

export default RecruitmentApplication
