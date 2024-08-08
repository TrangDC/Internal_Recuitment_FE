import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { LinkText, StyleTinyText } from 'shared/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import checkPermissionActionTableCandidateJob from 'features/candidatejob/permission/utils/checkPermissonActionTable'
import ChipCandidate from 'shared/class/candidate/components/ChipCandidate'
import CandidateJob from 'shared/schema/database/candidate_job'
import { format } from 'date-fns'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Mail from 'shared/components/icons/Mail'
import Phone from 'shared/components/icons/Phone'

const columnHelperCandidateJob = createColumnHelper<CandidateJob>()

export const columns_candidate_job = (
  actions: TOptionItem<CandidateJob>[],
  { me, role }: ParamsColumn
): ColumnDef<CandidateJob, any>[] => [
  columnHelperCandidateJob.accessor((row) => row.candidate.name, {
    id: 'candidate_name',
    cell: (info) => (
      <FlexBox flexDirection={'column'} gap={0.5}>
        <LinkText
          to={`/dashboard/job-application-detail/${info.row.original.id}`}
        >
          {info.getValue()}
        </LinkText>
        <FlexBox gap={0.75} alignItems={'center'}>
          <Mail sx={{ fontSize: '12px' }} />
          <StyleTinyText sx={{ fontSize: '12px' }}>
            {info.row.original.candidate.email}
          </StyleTinyText>
        </FlexBox>
        <FlexBox gap={0.75} alignItems={'center'}>
          <Phone sx={{ fontSize: '12px' }} />
          <StyleTinyText sx={{ fontSize: '12px' }}>
            {info.row.original.candidate.phone}
          </StyleTinyText>
        </FlexBox>
      </FlexBox>
    ),
    header: () => <span>Candidate name</span>,
    enableSorting: false,
    size: 250,
  }),
  columnHelperCandidateJob.accessor((row) => row.hiring_job.name, {
    id: 'job_applied',
    header: () => <span>Job applied</span>,
    cell: (info) => (
      <LinkText to={`/dashboard/job-detail/${info.row.original.hiring_job_id}`}>
        {info.getValue()}
      </LinkText>
    ),
    enableSorting: false,
    size: 200,
  }),
  columnHelperCandidateJob.accessor((row) => row.hiring_job.hiring_team.name, {
    id: 'hiring_team',
    header: () => <span>Hiring team</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelperCandidateJob.accessor((row) => row.status, {
    id: 'rec_team',
    header: () => <span>REC team</span>,
    enableSorting: false,
    size: 200,
    cell: (info) => <ChipCandidate status={info.row.original.status} />,
  }),
  columnHelperCandidateJob.accessor((row) => row.created_at, {
    id: 'created_at',
    header: () => <span>Applied on</span>,
    size: 200,
    enableSorting: false,
    cell: (info) => (
      <StyleTinyText>
        {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')}
      </StyleTinyText>
    ),
  }),
  columnHelperCandidateJob.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>Status</span>,
    enableSorting: false,
    size: 200,
    cell: (info) => <ChipCandidate status={info.row.original.status} />,
  }),
  columnHelperCandidateJob.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    id: 'action',
    cell: (rowData) => {
      const id = rowData.row.original.id
      const newActions = checkPermissionActionTableCandidateJob({
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
