import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/index'
import { CANDIDATE_STATUS } from './index'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next';
import { CandidateJob } from 'features/candidatejob/domain/interfaces'

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
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'applied_date',
    size: 200,
    header: () => <span>{t('applied_date')}</span>,
    cell: (info) => (
      <StyleSpanName>
        {/* {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')} */}
      </StyleSpanName>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
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
  columnHelper.accessor('id', {
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
