import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import ChipField from 'shared/components/input-fields/ChipField'
import { LinkText, StyleTinyText } from 'shared/styles'
import { LinkText as LinkNavigate } from 'shared/components/Typography'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import RecTeam from 'shared/schema/database/rec_team'
import checkPermissionActionRecTeams from 'features/rec-team/permission/utils/checkPermissionActionRec'
import HiringJob from 'shared/schema/database/hiring_job'
import { LOCATION_LABEL } from 'shared/constants/constants'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { ChipLimit } from 'shared/components/chip-stack'
import checkPermissionActionTableJob from 'features/jobs/permission/utils/checkPermissonActionTable'
import checkPermissionActionTableUser from 'features/user/permission/utils/checkPermissonActionTable'
import _ from 'lodash'
import User from 'shared/schema/database/user'
import Role from 'shared/schema/database/role'

const columnHelper = createColumnHelper<RecTeam>()

export const columns = (
  actions: TOptionItem<RecTeam>[],
  { me, role }: ParamsColumn
): ColumnDef<RecTeam, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={`/dashboard/rec-team-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),

  columnHelper.accessor((row) => row.leader, {
    id: 'leader',
    size: 600,
    cell: (info) => {
      const leader = info.getValue()
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {leader && (
            <ChipField
              key={leader.id} // Assuming leader.id is unique
              label={leader.name}
              sx={{
                background: ' #F1F9FF',
                color: '#121625',
              }}
            />
          )}
        </FlexBox>
      )
    },
    header: () => <span>{'Leader'}</span>,
    enableSorting: false,
  }),

  columnHelper.accessor('description', {
    id: 'description',
    size: 600,
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{t('Description')}</span>,
    enableSorting: false,
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
      const newActions = checkPermissionActionRecTeams({
        actions,
        role,
        rowData: info,
        me,
      })
      return (
        <ActionGroupButtons<RecTeam>
          rowId={id}
          actions={newActions}
          rowData={info.row.original}
        />
      )
    },
  }),
]

const columnHelperUser = createColumnHelper<User>()

export const columns_user = (
  actions: TOptionItem<User>[],
  { me, role, handleOpenDetail }: ParamsColumn
): ColumnDef<User, any>[] => [
  columnHelperUser.accessor('name', {
    id: 'name',
    cell: (info) => (
      <LinkNavigate onClick={() => handleOpenDetail?.(info.row.original.id)}>
        {info.getValue()}
      </LinkNavigate>
    ),
    header: () => <span>Name</span>,
    size: 250,
  }),
  columnHelperUser.accessor('work_email', {
    header: () => <span>Email</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 300,
  }),
  columnHelperUser.accessor('member_of_hiring_team.name', {
    id: 'team',
    header: () => <span>Team</span>,
    enableSorting: false,
    cell: (info) => {
      if (!info.getValue()) return ''
      return <StyleTinyText>{info.getValue()}</StyleTinyText>
    },
    size: 200,
  }),
  columnHelperUser.accessor('roles', {
    id: 'roles',
    header: () => <span>Role</span>,
    enableSorting: false,
    cell: (info) => {
      const roles: Role[] = info.getValue() ?? []
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {roles.map((member: Role, idx: number) => (
            <ChipField
              key={idx}
              label={member.name}
              sx={{
                background: ' #F1F9FF',
                color: '#121625',
              }}
            />
          ))}
        </FlexBox>
      )
    },
    size: 500,
  }),
  columnHelperUser.accessor('id', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>Action</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (info) => {
      const id = info.row.original.id
      const newAction = checkPermissionActionTableUser({
        actions,
        me,
        role,
        rowData: info,
      })
      return (
        <ActionGroupButtons<User>
          rowId={id}
          actions={newAction}
          rowData={info.row.original}
        />
      )
    },
  }),
]

