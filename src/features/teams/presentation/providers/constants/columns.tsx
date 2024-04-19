import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Employee, Team } from 'features/teams/domain/interfaces'
import { JobTitle } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { ButtonAction, StyleSpanName } from '../styles/style'
import { Button, Chip } from '@mui/material'

// const columnHelper = createColumnHelper<Employee>()

// export const columns = (
//   actions: TOptionItem<Employee>[]
// ): ColumnDef<Employee, any>[] => [
//   columnHelper.accessor('id', {
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//     header: () => <span>ID</span>,
//   }),
//   columnHelper.accessor((row) => row.fullName, {
//     id: 'fullName',
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <span>Full name</span>,
//   }),
//   columnHelper.accessor('nickName', {
//     header: () => 'nickName',
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor('companyAccountId', {
//     header: () => <span>companyAccountId</span>,
//   }),
//   columnHelper.accessor('code', {
//     header: 'code',
//   }),
//   columnHelper.accessor('gender', {
//     header: 'gender',
//   }),
//   {
//     cell: (info) => {
//       const id = info.row.original.id
//       return (
//         <ActionGroupButtons<Employee>
//           rowId={id}
//           actions={actions}
//           rowData={info.row.original}
//         />
//       )
//     },
//     id: 'action',
//   },
// ]

const columnHelper = createColumnHelper<Team>()

export const columns = (
  actions: TOptionItem<Team>[]
): ColumnDef<Team, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'fullName',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>NAME</span>,
  }),
  columnHelper.accessor('open_request', {
    header: () => <span>OPEN REQUESTS</span>,
    cell: (info) => <Chip  label={info.renderValue()} />,
  }),
  columnHelper.accessor('id', {
    header: () => <span>ACTION</span>,
    cell: (info) => {
      const id = info.row.original.id

      return <>
          <ActionGroupButtons<Team>
          rowId={id}
          actions={actions}
          rowData={info.row.original}
        />
     </>
    }
  }),
]