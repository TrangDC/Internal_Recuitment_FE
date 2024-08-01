import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import checkPermissionActionTable from 'features/skillType/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import SkillType from 'shared/schema/database/skill_type'
import { LinkText } from 'shared/components/Typography'

const columnHelper = createColumnHelper<SkillType>()

export const columns = (
  actions: TOptionItem<SkillType>[],
  { me, role, handleOpenDetail }: ParamsColumn
): ColumnDef<SkillType, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText onClick={() => handleOpenDetail?.(info.row.original.id)}>
        {info.getValue()}
      </LinkText>
    ),
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
          <ActionGroupButtons<SkillType>
            rowId={id}
            actions={newActions}
            rowData={rowData.row.original}
          />
        </>
      )
    },
  }),
]
