import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Hiring } from 'features/hiring/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'

const columnHelper = createColumnHelper<Hiring>()

export const columns = (
  actions: TOptionItem<Hiring>[]
): ColumnDef<Hiring, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => <span>NAME</span>,
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('team', {
    header: () => <span>Team</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('position', {
    header: () => <span>Position</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('id', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>ACTION</Span>
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
            <ActionGroupButtons<Hiring>
              rowId={id}
              actions={actions}
              rowData={info.row.original}
            />
        </>
      )
    },
  }),
]
