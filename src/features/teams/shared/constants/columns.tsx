import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import ChipField from 'shared/components/input-fields/ChipField'
import { LinkText, StyleTinyText } from 'shared/styles'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'
import checkPermissionActionTable from 'features/teams/permission/utils/checkPermissonActionTable'
import HiringTeam from 'shared/schema/database/hiring_team'
import User from 'shared/schema/database/user'

const columnHelper = createColumnHelper<HiringTeam>()

export const columns = (
  actions: TOptionItem<HiringTeam>[],
  { me, role }: ParamsColumn
): ColumnDef<HiringTeam, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText to={`/dashboard/team-detail/${info.row.original.id}`}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>{t('name')}</span>,
    size: 300,
  }),
  columnHelper.accessor((row) => row.managers, {
    id: 'members',
    size: 600,
    cell: (info) => {
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {info.getValue().map((member: User, idx: number) => (
            <ChipField
              key={idx}
              label={member.name}
              sx={{
                background: ' #F1F9FF',
                color: '#121625',
              }}
            />
          ))}
        </FlexBox>
      )
    },
    header: () => <span>{t('manager')}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('opening_requests', {
    header: () => <span>{t('open_requests')}</span>,
    size: 200,
    cell: (info) => <StyleTinyText>{info.renderValue()}</StyleTinyText>,
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
      const newActions = checkPermissionActionTable({
        actions,
        role,
        rowData: info,
        me,
      })
      return (
        <ActionGroupButtons<HiringTeam>
          rowId={id}
          actions={newActions}
          rowData={info.row.original}
        />
      )
    },
  }),
]
