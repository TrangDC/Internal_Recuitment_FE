import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { Candidate, CandidateJob } from 'features/candidates/domain/interfaces'
import { CANDIDATE_STATUS } from './index'
import { format } from 'date-fns'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next';

const columnHelper = createColumnHelper<Candidate>()
const columnHelperCandidateJob = createColumnHelper<CandidateJob>()

export const columns = (
  actions: TOptionItem<Candidate>[]
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>{t('name')}</span>,
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
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    header: () => <span>{t('created_date')}</span>,
    size: 200,
    enableSorting: true,
    cell: (info) => (
      <StyleSpanName>
        {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')}
      </StyleSpanName>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
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

export const columnsCandidateJob = (
  actions: TOptionItem<CandidateJob>[]
): ColumnDef<CandidateJob, any>[] => [
  columnHelperCandidateJob.accessor((row) => row.candidate_id, {
    id: 'job_name',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>{t('job_name')}</span>,
    enableSorting: false,
  }),
  columnHelperCandidateJob.accessor((row) => row.candidate_id, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
  }),
  columnHelperCandidateJob.accessor((row) => row.created_at, {
    id: 'applied_date',
    size: 200,
    header: () => <span>{t('applied_date')}</span>,
    cell: (info) => (
      <StyleSpanName>
        {/* {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')} */}
      </StyleSpanName>
    ),
  }),
  columnHelperCandidateJob.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>{t('status')}</span>,
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
  columnHelperCandidateJob.accessor('id', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<CandidateJob>
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
