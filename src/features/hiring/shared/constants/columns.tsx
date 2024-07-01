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
    size: 500,
  }),
  columnHelper.accessor('work_email', {
    header: () => <span>Email</span>,
    enableSorting: false,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    size: 500,
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