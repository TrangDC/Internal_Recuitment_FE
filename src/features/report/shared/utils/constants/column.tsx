import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import { StyleTinyText } from 'shared/styles'
import { HiringTeamTableData } from 'features/report/domain/interface'
import { Box } from '@mui/material'

const columnHelper = createColumnHelper<HiringTeamTableData>()

export const columnsByTeam = (
  actions: TOptionItem<HiringTeamTableData>[]
): ColumnDef<HiringTeamTableData, any>[] => [
  columnHelper.accessor((row) => row.teamName, {
    id: 'Team',
    cell: (info) => {
      return <StyleTinyText>{info.getValue()}</StyleTinyText>
    },
    header: () => <span>Hiring team</span>,
    size: 200,
  }),
  columnHelper.accessor('indicator', {
    id: 'indicator',
    header: () => <span>Indicator</span>,
    cell: (info) => {
      return (
        <Box>
          <StyleTinyText>Candidate counts</StyleTinyText>
          <StyleTinyText>Conversion rate</StyleTinyText>
        </Box>
      )
    },
    enableSorting: false,
    size: 200,
  }),
  columnHelper.accessor('applied', {
    id: 'applied',
    header: () => <span>Applied</span>,
    cell: (info) => {
      return (
        <Box>
          <StyleTinyText>{info.getValue()?.value}</StyleTinyText>
          <StyleTinyText>{info.getValue()?.percentage}</StyleTinyText>
        </Box>
      )
    },
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor('interviewing', {
    id: 'interviewing',
    header: () => <span>Interviewing</span>,
    cell: (info) => {
      return (
        <Box>
          <StyleTinyText>{info.getValue()?.value}</StyleTinyText>
          <StyleTinyText>{info.getValue()?.percentage}</StyleTinyText>
        </Box>
      )
    },
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor('offering', {
    id: 'offering',
    header: () => <span>Offering</span>,
    cell: (info) => {
      return (
        <Box>
          <StyleTinyText>{info.getValue()?.value}</StyleTinyText>
          <StyleTinyText>{info.getValue()?.percentage}</StyleTinyText>
        </Box>
      )
    },
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor('hired', {
    id: 'hired',
    header: () => <span>Hired</span>,
    cell: (info) => {
      return (
        <Box>
          <StyleTinyText>{info.getValue()?.value}</StyleTinyText>
          <StyleTinyText>{info.getValue()?.percentage}</StyleTinyText>
        </Box>
      )
    },
    enableSorting: false,
    size: 100,
  }),
]
