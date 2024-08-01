import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import { LinkText, StyleTinyText } from 'shared/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import checkPermissionActionTable from 'features/job-position/permission/utils/checkPermissonActionTable'
import checkPermissionActionTableJob from 'features/jobs/permission/utils/checkPermissonActionTable'
import HiringJob from 'shared/schema/database/hiring_job'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { ChipLimit } from 'shared/components/chip-stack'
import JobPosition from 'shared/schema/database/job_position'

const columnHelper = createColumnHelper<JobPosition>()

export const columns = (
  actions: TOptionItem<JobPosition>[],
  { me, role }: ParamsColumn
): ColumnDef<JobPosition, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText to={`/dashboard/job-position-detail/${info.row.original.id}`}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    size: 200,
    cell: (info) => <StyleTinyText>{info.renderValue()}</StyleTinyText>,
  }),
  columnHelper.accessor('id', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>{t('action')}</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (info) => {
      const id = info.row.original.id
      const newActions = checkPermissionActionTable({
        actions,
        role,
        rowData: info,
        me,
      })
      return (
        <ActionGroupButtons<JobPosition>
          rowId={id}
          actions={newActions}
          rowData={info.row.original}
        />
      )
    },
  }),
]

const columnHelperJob = createColumnHelper<HiringJob>()
export const columns_job_request = (
  actions: TOptionItem<HiringJob>[],
  { me, role }: ParamsColumn
): ColumnDef<HiringJob, any>[] => [
  columnHelperJob.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText to={`/dashboard/job-detail/${info.row.original.id}`}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>Job name</span>,
  }),
  columnHelperJob.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>{t('location')}</span>,
    cell: (info) => (
      <StyleTinyText>
        {LOCATION_LABEL[info.row.original.location]}
      </StyleTinyText>
    ),
    enableSorting: false,
  }),
  columnHelperJob.accessor((row) => row.user.name, {
    id: 'requester',
    header: () => <span>{t('requester')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelperJob.accessor((row) => row.amount, {
    id: 'amount',
    header: () => <span>{t('staft_required')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 150,
  }),
  columnHelperJob.accessor((row) => row.total_candidates_recruited, {
    id: 'total_candidates_recruited',
    header: () => <span>{t('hired')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 100,
  }),
   columnHelperJob.accessor((row) => row.priority, {
    id: 'priority',
    size: 150,
    header: () => <span>Priority</span>,
    cell: (info) => {
      return <ChipPriority status={info.row.original.priority} />
    },
  }),
  columnHelperJob.accessor((row) => row.entity_skill_types, {
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
  columnHelperJob.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (rowData) => {
      const row = rowData.row.original
      const id = row.id
      const newActions = checkPermissionActionTableJob({
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

