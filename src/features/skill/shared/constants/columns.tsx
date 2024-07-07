import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import { Skill } from 'features/skill/domain/interfaces'
import checkPermissionActionTable from 'features/skill/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'

const columnHelper = createColumnHelper<Skill>()

export const columns = (
  actions: TOptionItem<Skill>[],
  { me, role }: ParamsColumn
): ColumnDef<Skill, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),
  columnHelper.accessor((row) => row.skill_type, {
    id: 'skill_type',
    cell: (info) => (
      <StyleTinyText>{info.row.original.skill_type.name}</StyleTinyText>
    ),
    header: () => <span>Skill type</span>,
    size: 300,
    enableSorting: false,
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
    cell: (rowData) => {
      const id = rowData.row.original.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData,
      })
      return (
        <>
          <ActionGroupButtons<Skill>
            rowId={id}
            actions={newActions}
            rowData={rowData.row.original}
          />
        </>
      )
    },
  }),
]
