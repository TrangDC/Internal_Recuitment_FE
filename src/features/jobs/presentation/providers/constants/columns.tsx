import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { Job } from 'features/jobs/domain/interfaces'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { PRIORITY_DATA } from 'shared/components/autocomplete/priority-auto-complete'
import { LinkText, StyleTinyText } from 'shared/styles'
import { JobStatus } from 'shared/class/job-status'

const columnHelper = createColumnHelper<Job>()

export const columns = (actions: TOptionItem<Job>[]): ColumnDef<Job, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={`/dashboard/job-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>Job name</span>,
  }),
  columnHelper.accessor((row) => row.team.name, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>{t('location')}</span>,
    cell: (info) => (
      <StyleTinyText>
        {LOCATION_LABEL[info.row.original.location]}
      </StyleTinyText>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.user.name, {
    id: 'requester',
    header: () => <span>{t('requester')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'amount',
    header: () => <span>{t('staft_required')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.total_candidates_recruited, {
    id: 'total_candidates_recruited',
    header: () => <span>{t('hired')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    size: 150,
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    cell: (info) => {
      const field_status = JobStatus.STATUS_STYLE[info.row.original.status];

      return (
        <ChipFieldStatus
          label={field_status?.text}
          style={{
            backgroundColor: field_status?.backgroundColor,
            color: field_status?.color,
          }}
        />
      )
    },
  }),
  columnHelper.accessor((row) => row.priority, {
    id: 'priority',
    size: 150,
    header: () => <span>Priority</span>,
    cell: (info) => {
      const priority =  PRIORITY_DATA[info.row.original.priority]

        return (
        <ChipFieldStatus
        label={priority?.label}
        style={{
          backgroundColor: priority?.backgroundColor,
          color: priority?.color,
        }}
      />
      )
    },
  }),
  columnHelper.accessor((row) => row.skill, {
    id: 'skill',
    size: 150,
    header: () => <span>Skills</span>,
    cell: (info) => {
      return 'skill'
    },
  }),
  columnHelper.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
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
