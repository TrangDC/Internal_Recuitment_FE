import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { format } from 'date-fns'
import { LinkText, StyleTinyText } from 'shared/styles'
import ChipCandidate from 'shared/class/candidate/components/ChipCandidate'
import checkPermissionActionTable from 'features/candidatejob/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import CandidateJob from 'shared/schema/database/candidate_job'

const columnHelper = createColumnHelper<CandidateJob>()

export const columns = (
  actions: TOptionItem<CandidateJob>[],
  { me, role }: ParamsColumn
): ColumnDef<CandidateJob, any>[] => [
  columnHelper.accessor((row) => row.hiring_job.name, {
    id: 'job_name',
    cell: (info) => (
      <LinkText
        to={`/dashboard/job-application-detail/${info.row.original.id}`}
      >
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>{t('job_name')}</span>,
    size: 400,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.hiring_job.hiring_team.name, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor((row) => row.updated_at, {
    id: 'updated_at',
    size: 400,
    header: () => <span>Last update</span>,
    cell: (info) => (
      <StyleTinyText>
        {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')}
      </StyleTinyText>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'created_at',
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    size: 200,
    cell: (info) => <ChipCandidate status={info.row.original.status} />,
  }),
  columnHelper.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    id: 'action',
    cell: (rowData) => {
      const id = rowData.row.original.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData,
      })
      return (
        <>
          <ActionGroupButtons<CandidateJob>
            rowId={id}
            actions={newActions}
            rowData={rowData.row.original}
          />
        </>
      )
    },
    enableSorting: false,
  }),
]
