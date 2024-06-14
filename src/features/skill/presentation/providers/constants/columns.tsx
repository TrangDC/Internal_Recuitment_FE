import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import { Skill } from 'features/skill/domain/interfaces'

const columnHelper = createColumnHelper<Skill>()

export const columns = (
  actions: TOptionItem<Skill>[]
): ColumnDef<Skill, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <StyleTinyText>
        {info.getValue()}
      </StyleTinyText>
    ),
    header: () => <span>{t('name')}</span>,
    size: 500,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    header: () => <span>Description</span>,
    size: 1000,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor('created_at', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<Skill>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
