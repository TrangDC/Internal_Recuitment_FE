import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import { CANDIDATE_STATUS } from './index'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next';
import { format } from 'date-fns'

const columnHelper = createColumnHelper<CandidateJob>()

export const columns = (
  actions: TOptionItem<CandidateJob>[]
): ColumnDef<CandidateJob, any>[] => [
  columnHelper.accessor((row) => row.candidate_id, {
    id: 'job_name',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>{t('job_name')}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.candidate_id, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.updated_at, {
    id: 'updated_at',
    size: 200,
    header: () => <span>{t('applied_date')}</span>,
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
  columnHelper.accessor('created_at', {
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
