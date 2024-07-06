import { styled } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Hiring } from 'features/hiring/domain/interfaces'
import checkPermissionActionTable from 'features/hiring/permission/utils/checkPermissonActionTable'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
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
  columnHelper.accessor((row) => row.name, {
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
  columnHelper.accessor((row) => row.team?.name, {
    id: 'team',
    header: () => <span>Team</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 400,
  }),
  columnHelper.accessor((row) => row.entity_permissions, {
    id: 'status',
    header: () => <span>Role</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 800,
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
