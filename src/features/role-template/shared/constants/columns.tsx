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

const columnHelper = createColumnHelper<RoleTemplate>()

export const columns = (
  actions: TOptionItem<RoleTemplate>[]
): ColumnDef<RoleTemplate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>Name</span>,
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
    cell: (info) => {
      const id = info.row.original.id
      return (
        <>
          <ActionGroupButtons<RoleTemplate>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
