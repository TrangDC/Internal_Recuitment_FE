import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { Job } from 'features/jobs/domain/interfaces'

const columnHelper = createColumnHelper<Job>()

export const columns = (actions: TOptionItem<Job>[]): ColumnDef<Job, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>Name</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.team, {
    id: 'team',
    header: () => <span>Team</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>Location</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.requester, {
    id: 'requester',
    header: () => <span>Requester</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.numbers, {
    id: 'numbers',
    header: () => <span>Required candidates</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: 'createdAt',
    header: () => <span>Created date</span>,
    cell: (info) => <StyleSpanName>
      {/* {format(new Date(info.getValue()), "hh:mm a, MM/dd/yyyy")} */}
      </StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.hired, {
    id: 'Hired',
    header: () => <span>Hired</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor('id', {
    header: () => <span>ACTION</span>,
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
