import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { JobTitle } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'

const columnHelper = createColumnHelper<JobTitle>()

export const columns = (
  actions: TOptionItem<JobTitle>[]
): ColumnDef<JobTitle, any>[] => [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('code', {
    header: () => 'code',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('description', {
    header: () => <span>description</span>,
  }),
  // columnHelper.accessor('code', {
  //   header: 'code',
  // }),
  // columnHelper.accessor('gender', {
  //   header: 'gender',
  // }),
  {
    cell: (info) => {
      const id = info.row.original.id
      return (
        <ActionGroupButtons<JobTitle>
          rowId={id}
          actions={actions}
          rowData={info.row.original}
        />
      )
    },
    id: 'action',
  },
]
