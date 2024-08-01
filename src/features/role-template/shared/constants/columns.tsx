import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { LinkText, Span } from 'shared/components/Typography'
import checkPermissionActionTable from 'features/role-template/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import Role from 'shared/schema/database/role'

const columnHelper = createColumnHelper<Role>()

export const columns = (
  actions: TOptionItem<Role>[],
  { me, role, handleOpenDetail }: ParamsColumn
): ColumnDef<Role, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText onClick={() => handleOpenDetail?.(info.row.original.id)}>
        {info.getValue()}
      </LinkText>
    ),
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
        <ActionGroupButtons<Role>
          rowId={id}
          actions={newActions}
          rowData={rowData.row.original}
        />
      )
    },
  }),
]
