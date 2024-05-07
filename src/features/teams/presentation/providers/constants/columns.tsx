import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Team } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { StyleSpanName } from '../styles/style'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'

const columnHelper = createColumnHelper<Team>()

export const columns = (
  actions: TOptionItem<Team>[]
): ColumnDef<Team, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleSpanName>{info.getValue()}</StyleSpanName>,
    header: () => <span>Name</span>,
    meta: {
      style: {width: 'auto'}
    },
  }),
  columnHelper.accessor('open_request', {
    header: () => <span>Open Requests</span>,
    cell: (info) => info.renderValue(),
    meta: {
      style: {width: 'auto'}
    },
  }),
  columnHelper.accessor('id', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>Action</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    meta: {
      style: {width: '100px'}
    },
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
            <ActionGroupButtons<Team>
              rowId={id}
              actions={actions}
              rowData={info.row.original}
            />
        </>
      )
    },
  }),
]
