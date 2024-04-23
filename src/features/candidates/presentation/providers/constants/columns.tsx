import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { Candidate, Interview } from 'features/candidates/domain/interfaces'
import { CANDIDATE_STATUS } from '.'
import { Chip } from '@mui/material'

const columnHelper = createColumnHelper<Candidate>()
const columnHelperInterview = createColumnHelper<Interview>()

export const columns = (
  actions: TOptionItem<Candidate>[]
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>Name</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    header: () => <span>Email</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.phone_number, {
    id: 'phone_number',
    header: () => <span>Phone number</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    header: () => <span>Created date</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>Interview status</span>,
    cell: (info) => (
      <Chip
      //@ts-ignore
        label={CANDIDATE_STATUS[info.getValue()]['text']}
        style={{
          //@ts-ignore
          backgroundColor: CANDIDATE_STATUS[info.getValue()]['backgroundColor'],
          color: 'white',
        }}
      />
    ),
  }),
  columnHelper.accessor('id', {
    header: () => <span>ACTION</span>,
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<Candidate>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]

export const columnsInterview = (
  actions: TOptionItem<Interview>[]
): ColumnDef<Interview, any>[] => [
  columnHelperInterview.accessor((row) => row.job_name, {
    id: 'job_name',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>Job name</span>,
    enableSorting: false,
  }),
  columnHelperInterview.accessor((row) => row.team, {
    id: 'team',
    header: () => <span>Team</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelperInterview.accessor((row) => row.applied_date, {
    id: 'applied_date',
    header: () => <span>Applied date</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelperInterview.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>Interview status</span>,
    cell: (info) => (
      <Chip
      //@ts-ignore
        label={CANDIDATE_STATUS[info.getValue()]['text']}
        style={{
          //@ts-ignore
          backgroundColor: CANDIDATE_STATUS[info.getValue()]['backgroundColor'],
          color: 'white',
        }}
      />
    ),
  }),
  columnHelperInterview.accessor('id', {
    header: () => <span>ACTION</span>,
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<Interview>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
