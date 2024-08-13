import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { LinkText, StyleTinyText } from 'shared/styles'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { ChipLimit } from 'shared/components/chip-stack'
import checkPermissionActionTable from 'features/jobs/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import _ from 'lodash'
import HiringJob from 'shared/schema/database/hiring_job'

const columnHelper = createColumnHelper<HiringJob>()

export const columns = (
  actions: TOptionItem<HiringJob>[],
  { me, role }: ParamsColumn
): ColumnDef<HiringJob, any>[] => [
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    size: 150,
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    cell: (info) => {
      return <ChipJob status={info.row.original.status} />
    },
  }),
  columnHelper.accessor((row) => row.priority, {
    id: 'priority',
    size: 150,
    header: () => <span>Priority</span>,
    cell: (info) => {
      return <ChipPriority status={info.row.original.priority} />
    },
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText
        to={`/dashboard/job-detail/${info.row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'job_position',
    cell: (info) => (
      <StyleTinyText>{info?.row?.original?.job_position?.name}</StyleTinyText>
    ),
    header: () => <span>Job position</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.hiring_team.name, {
    id: 'team',
    header: () => <span>{t('Hiring team')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>{t('location')}</span>,
    cell: (info) => (
      <StyleTinyText>
        {_.get(LOCATION_LABEL, info.row.original.location)}
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
    size: 150,
  }),
  columnHelper.accessor((row) => row.total_candidates_recruited, {
    id: 'total_candidates_recruited',
    header: () => <span>{t('hired')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 100,
  }),
  columnHelper.accessor((row) => row.entity_skill_types, {
    id: 'created_at',
    header: () => <span>Skill required</span>,
    size: 200,
    cell: (info) => {
      const skill_types = info.row.original.entity_skill_types
      const label_list = skill_types
        ? skill_types.flatMap((type) => {
            return type.entity_skills.map((skill) => skill.name)
          })
        : []

      return (
        <StyleTinyText>
          <ChipLimit chips={label_list} limit={2} />
        </StyleTinyText>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (rowData) => {
      const row = rowData.row.original
      const id = row.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData,
      })
      return (
        <ActionGroupButtons<HiringJob>
          rowId={id}
          actions={newActions}
          rowData={rowData.row.original}
        />
      )
    },
  }),
]

export const columns_opening = (
  actions: TOptionItem<HiringJob>[],
  { me, role }: ParamsColumn
): ColumnDef<HiringJob, any>[] => [
  columnHelper.accessor((row) => row.priority, {
    id: 'priority',
    size: 150,
    header: () => <span>Priority</span>,
    cell: (info) => {
      return <ChipPriority status={info.row.original.priority} />
    },
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText to={`/dashboard/job-detail/${info.row.original.id}`}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <StyleTinyText>{info?.row?.original?.job_position?.name}</StyleTinyText>
    ),
    header: () => <span>Job position</span>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.hiring_team.name, {
    id: 'team',
    header: () => <span>Hiring team</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 100,
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
    size: 150,
  }),
  columnHelper.accessor((row) => row.level, {
    id: 'level',
    header: () => <span>{t('level')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 150,
  }),
  columnHelper.accessor((row) => row.total_candidates_recruited, {
    id: 'total_candidates_recruited',
    header: () => <span>{t('hired')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 100,
  }),
  columnHelper.accessor((row) => row.entity_skill_types, {
    id: 'created_at',
    header: () => <span>Skill required</span>,
    size: 200,
    cell: (info) => {
      const skill_types = info.row.original.entity_skill_types
      const label_list = skill_types
        ? skill_types.flatMap((type) => {
            return type.entity_skills.map((skill) => skill.name)
          })
        : []

      return (
        <StyleTinyText>
          <ChipLimit chips={label_list} limit={2} />
        </StyleTinyText>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (rowData) => {
      const row = rowData.row.original
      const id = row.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData,
      })
      return (
        <ActionGroupButtons<HiringJob>
          rowId={id}
          actions={newActions}
          rowData={rowData.row.original}
        />
      )
    },
  }),
]
