import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import { StyleTinyText } from 'shared/styles'
import { ByHiringTeam } from 'features/report/domain/interface'

const columnHelper = createColumnHelper<ByHiringTeam>()

export const columns = (
  actions: TOptionItem<ByHiringTeam>[]
): ColumnDef<ByHiringTeam, any>[] => [
  columnHelper.accessor((row) => row.team, {
    id: 'Team',
    cell: (info) => <StyleTinyText>Hiring team</StyleTinyText>,
    header: () => <span>Hiring team</span>,
    size: 500,
  }),
  columnHelper.accessor('indicator', {
    id: 'indicator',
    header: () => <span>Indicator</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor('applied', {
    id: 'applied',
    header: () => <span>Applied</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor('interviewing', {
    id: 'interviewing',
    header: () => <span>Interviewing</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor('offering', {
    id: 'offering',
    header: () => <span>Offering</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor('hired', {
    id: 'hired',
    header: () => <span>Hired</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
]
