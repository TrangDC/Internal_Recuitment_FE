import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next'
import { format } from 'date-fns'
import { CANDIDATE_STATUS } from 'features/candidates/presentation/providers/constants'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { LinkText, StyleTinyText } from 'shared/styles'

const columnHelper = createColumnHelper<CandidateJob>()

export const columns = (
  actions: TOptionItem<CandidateJob>[]
): ColumnDef<CandidateJob, any>[] => [
  columnHelper.accessor((row) => row.hiring_job.name, {
    id: 'job_name',
    cell: (info) => <LinkText to={`/dashboard/job-application-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>{t('job_name')}</span>,
    size: 500,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.hiring_job.team.name, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor((row) => row.updated_at, {
    id: 'updated_at',
    size: 500,
    header: () => <span>Last update</span>,
    cell: (info) => (
      <StyleTinyText>
        {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')}
      </StyleTinyText>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    size: 200,
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
    id: 'action',
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
