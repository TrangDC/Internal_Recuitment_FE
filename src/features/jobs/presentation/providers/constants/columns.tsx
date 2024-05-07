import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { Job } from 'features/jobs/domain/interfaces'
import { format } from 'date-fns'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { STATUS_STYLE } from '.'

const columnHelper = createColumnHelper<Job>()

export const columns = (actions: TOptionItem<Job>[]): ColumnDef<Job, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>Name</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.team.name, {
    id: 'team',
    header: () => <span>Team</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>Location</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.user.name, {
    id: 'requester',
    header: () => <span>Requester</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'amount',
    header: () => <span>Staft required</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'Hired',
    header: () => <span>Hired</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    size: 200,
    header: () => <span>Created date</span>,
    cell: (info) => (
      <StyleSpanName>
        {format(new Date(info.getValue()), 'hh:mm a, MM/dd/yyyy')}
      </StyleSpanName>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    size: 200,
    header: () => <span>Status</span>,
    cell: (info) => (
      <ChipFieldStatus
        label={STATUS_STYLE[info.getValue()].text}
        style={{
          backgroundColor: STATUS_STYLE[info.getValue()].backgroundColor,
          color: STATUS_STYLE[info.getValue()].color,
        }}
      />
    ),
  }),
  columnHelper.accessor('id', {
    header: () => <span>Action</span>,
    size: 100,
    enableSorting: false,
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<Job>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
