import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Member, Team } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import ChipField from 'shared/components/input-fields/ChipField'
import { LinkText, StyleTinyText } from 'shared/styles'

const columnHelper = createColumnHelper<Team>()

export const columns = (
  actions: TOptionItem<Team>[]
): ColumnDef<Team, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={`/dashboard/team-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>{t('name')}</span>,
    meta: {
      style: { width: '500px' },
    },
  }),
  columnHelper.accessor((row) => row.members, {
    id: 'members',
    meta: {
      style: { width: '500px' },
    },
    cell: (info) => {
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {info.getValue().map((member: Member, idx: number) => (
            <ChipField key={idx} label={member.name} sx={{
              background:' #F1F9FF',
              color: '#121625'

            }}/>
          ))}
        </FlexBox>
      )
    },
    header: () => <span>{t('manager')}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('opening_requests', {
    header: () => <span>{t('open_requests')}</span>,
    meta: {
      style: { width: '500px' },
    },
    cell: (info) => <StyleTinyText>{info.renderValue()}</StyleTinyText>,
  }),
  columnHelper.accessor('newest_applied', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>{t('action')}</Span>
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
          <ActionGroupButtons<Team>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
