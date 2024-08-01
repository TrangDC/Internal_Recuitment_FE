import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import ChipField from 'shared/components/input-fields/ChipField'
import { LinkText } from 'shared/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import RecTeam from 'shared/schema/database/rec_team'
import checkPermissionActionRecTeams from 'features/rec-team/permission/utils/checkPermissionActionRec'

const columnHelper = createColumnHelper<RecTeam>()

export const columns = (
  actions: TOptionItem<RecTeam>[],
  { me, role }: ParamsColumn
): ColumnDef<RecTeam, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={''}>{info.getValue()}</LinkText>,
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),

  columnHelper.accessor((row) => row.leader, {
    id: 'leader',
    size: 600,
    cell: (info) => {
      const leader = info.getValue()
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {leader && (
            <ChipField
              key={leader.id} // Assuming leader.id is unique
              label={leader.name}
              sx={{
                background: ' #F1F9FF',
                color: '#121625',
              }}
            />
          )}
        </FlexBox>
      )
    },
    header: () => <span>{t('leader')}</span>,
    enableSorting: false,
  }),

  columnHelper.accessor('description', {
    id: 'description',
    size: 600,
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>{t('Description')}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('id', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>{t('action')}</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (info) => {
      const id = info.row.original.id
      const newActions = checkPermissionActionRecTeams({
        actions,
        role,
        rowData: info,
        me,
      })
      return (
        <ActionGroupButtons<RecTeam>
          rowId={id}
          actions={newActions}
          rowData={info.row.original}
        />
      )
    },
  }),
]
