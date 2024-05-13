import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { Candidate, Interview } from 'features/candidates/domain/interfaces'
import { CANDIDATE_STATUS } from './index'
import { format } from 'date-fns'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next';

const columnHelper = createColumnHelper<Candidate>()
const columnHelperInterview = createColumnHelper<Interview>()

export const columns = (
  actions: TOptionItem<Candidate>[]
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>{t('name')}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    header: () => <span>{t('email')}</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.phone, {
    id: 'phone',
    header: () => <span>{t('phone_number')}</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    header: () => <span>{t('created_date')}</span>,
    size: 200,
    cell: (info) => (
      <StyleSpanName>
        {format(new Date(info.getValue()), 'hh:mm a, MM/dd/yyyy')}
      </StyleSpanName>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>{t('status')}</span>,
    cell: (info) => {
      //@ts-ignore
      const status = CANDIDATE_STATUS[info.getValue()]

      return (
        <ChipFieldStatus
          label={status.text}
          style={{
            backgroundColor: status.backgroundColor,
            color: 'white',
          }}
        />
      )
    },
  }),
  columnHelper.accessor('id', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
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
    size: 200,
    header: () => <span>Applied date</span>,
    cell: (info) => (
      <StyleSpanName>
        {' '}
        {format(new Date(info.getValue()), 'hh:mm a, MM/dd/yyyy')}
      </StyleSpanName>
    ),
  }),
  columnHelperInterview.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>Interview status</span>,
    cell: (info) => (
      <ChipFieldStatus
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
    size: 100,
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
    enableSorting: false,
  }),
]
