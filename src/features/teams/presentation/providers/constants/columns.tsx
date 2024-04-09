import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Employee } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'

const columnHelper = createColumnHelper<Employee>()

export const columns = (
  actions: TOptionItem<Employee>[]
): ColumnDef<Employee, any>[] => [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.fullName, {
    id: 'fullName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Full name</span>,
  }),
  columnHelper.accessor('nickName', {
    header: () => 'nickName',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('companyAccountId', {
    header: () => <span>companyAccountId</span>,
  }),
  columnHelper.accessor('code', {
    header: 'code',
  }),
  columnHelper.accessor('gender', {
    header: 'gender',
  }),
  {
    cell: (info) => {
      const id = info.row.original.id
      return (
        <ActionGroupButtons<Employee>
          rowId={id}
          actions={actions}
          rowData={info.row.original}
        />
      )
    },
    id: 'action',
  },
]
