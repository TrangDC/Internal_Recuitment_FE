import { styled } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Hiring, Role } from 'features/hiring/domain/interfaces'
import checkPermissionActionTable from 'features/hiring/permission/utils/checkPermissonActionTable'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import ChipField from 'shared/components/chip-stack/chip-field'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import { Span } from 'shared/components/Typography'

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
}))

const columnHelper = createColumnHelper<Hiring>()

export const columns = (
  actions: TOptionItem<Hiring>[],
  { me, role }: ParamsColumn
): ColumnDef<Hiring, any>[] => [
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>Name</span>,
    size: 250,
  }),
  columnHelper.accessor('work_email', {
    header: () => <span>Email</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 300,
  }),
  columnHelper.accessor('member_of_teams.name', {
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
  columnHelper.accessor('created_at', {
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
        <ActionGroupButtons<Hiring>
          rowId={id}
          actions={newAction}
          rowData={info.row.original}
        />
      )
    },
  }),
]
