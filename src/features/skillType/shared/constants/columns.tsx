import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next';
import { StyleTinyText } from 'shared/styles'
import { SkillType } from 'features/skillType/domain/interfaces';

const columnHelper = createColumnHelper<SkillType>()

export const columns = (
  actions: TOptionItem<SkillType>[]
): ColumnDef<SkillType, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'created_at',
    header: () => <span>Description</span>,
    size: 800,
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
          <ActionGroupButtons<SkillType>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]

