import { styled } from '@mui/material'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Hiring } from 'features/hiring/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'
import { Span } from 'shared/components/Typography'

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
}))

const columnHelper = createColumnHelper<Hiring>()

export const columns = (
  actions: TOptionItem<Hiring>[]
): ColumnDef<Hiring, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>Name</span>,
    meta: {
      style: { width: '800px' },
    },
  }),
  columnHelper.accessor('work_email', {
    header: () => <span>Email</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    meta: {
      style: { width: '800px' },
    },
  }),
  // columnHelper.accessor((row) => row.team?.name, {
  //   id: 'team',
  //   header: () => <span>Team</span>,
  //   enableSorting: false,
  //   cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  // }),
  // columnHelper.accessor((row) => row.status, {
  //   id: 'status',
  //   header: () => <span>Status</span>,
  //   enableSorting: false,
  //   cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  // }),
  columnHelper.accessor('created_at', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>Action</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    meta: {
      isPinned: 'right',
      style: {
        minWidth: '100px',
        maxWidth: '100px',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 0,
        background: 'rgb(252, 252, 252)'
      }
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
