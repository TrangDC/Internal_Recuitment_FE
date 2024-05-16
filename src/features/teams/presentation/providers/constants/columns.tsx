import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Member, Team } from 'features/teams/domain/interfaces'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import { TinyText } from 'shared/components/form/styles'
import ChipField from 'shared/components/input-fields/ChipField'
import { styled } from '@mui/material'


const columnHelper = createColumnHelper<Team>()

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
}))

export const columns = (
  actions: TOptionItem<Team>[]
): ColumnDef<Team, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>{t('name')}</span>,
    meta: {
      style: { width: '300px' },
    },
  }),
  columnHelper.accessor((row) => row.members, {
    id: 'members',
    cell: (info) => {
      return (
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          {info.getValue().map((member: Member, idx: number) => <ChipField key={idx} label={member.name}/>)}
        </FlexBox>
      )
    },
    header: () => <span>{t('manager')}</span>,
    meta: {
      style: { width: '300px' },
    },
    enableSorting: false,
  }),
  columnHelper.accessor('opening_requests', {
    header: () => <span>{t('open_requests')}</span>,
    cell: (info) => info.renderValue(),
    meta: {
      style: { width: '300px' },
    },
  }),
  columnHelper.accessor('created_at', {
    header: () => (
      <FlexBox justifyContent={'flex-end'} width={'100%'}>
        <Span>{t('action')}</Span>
      </FlexBox>
    ),
    size: 100,
    enableSorting: false,
    meta: {
      style: { width: '100px' },
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
