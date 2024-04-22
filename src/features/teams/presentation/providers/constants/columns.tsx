import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Team } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/style'
import { Chip } from '@mui/material'

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