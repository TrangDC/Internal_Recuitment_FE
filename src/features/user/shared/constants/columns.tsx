import { styled } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import checkPermissionActionTable from 'features/user/permission/utils/checkPermissonActionTable'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import ChipField from 'shared/components/chip-stack/chip-field'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import { LinkText, Span } from 'shared/components/Typography'
import Role from 'shared/schema/database/role'
import User from 'shared/schema/database/user'

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
}))

const columnHelper = createColumnHelper<User>()

export const columns = (
  actions: TOptionItem<User>[],
  { me, role, handleOpenDetail }: ParamsColumn
): ColumnDef<User, any>[] => [
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => (
      <LinkText onClick={() => handleOpenDetail?.(info.row.original.id)}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>Name</span>,
    size: 250,
  }),
  columnHelper.accessor('work_email', {
    header: () => <span>Email</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 300,
  }),
  columnHelper.accessor('member_of_hiring_team.name', {
    id: 'team',
    header: () => <span>Team</span>,
    enableSorting: false,
    cell: (info) => {
      if (!info.getValue()) return ''
      return <StyleTinyText>{info.getValue()}</StyleTinyText>
    },
    size: 200,
  }),
  columnHelper.accessor('roles', {
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
  columnHelper.accessor('id', {
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
      const newAction = checkPermissionActionTable({
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
