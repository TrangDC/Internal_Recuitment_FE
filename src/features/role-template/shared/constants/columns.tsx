import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { RoleTemplate } from 'features/role-template/domain/interfaces'
import checkPermissionActionTable from 'features/role-template/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'

const columnHelper = createColumnHelper<RoleTemplate>()

export const columns = (
  actions: TOptionItem<RoleTemplate>[],
  { me, role }: ParamsColumn
): ColumnDef<RoleTemplate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>Role Name</span>,
    size: 500,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    header: () => <span>{t('description')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
    size: 500,
  }),
  columnHelper.accessor('id', {
    id: 'action',
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>Action</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    cell: (rowData) => {
      const id = rowData.row.original.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData: rowData,
      })
      return (
        <ActionGroupButtons<RoleTemplate>
          rowId={id}
          actions={newActions}
          rowData={rowData.row.original}
        />
      )
    },
  }),
]
