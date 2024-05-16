import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { Job } from 'features/jobs/domain/interfaces'
import { format } from 'date-fns'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { STATUS_STYLE } from './index'
import { t } from 'i18next'
import { styled } from '@mui/material'
import { TinyText } from 'shared/components/form/styles'

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
}))

const columnHelper = createColumnHelper<Job>()

export const columns = (actions: TOptionItem<Job>[]): ColumnDef<Job, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    header: () => <span>{t('name')}</span>,
    // enableSorting: false,
  }),
  columnHelper.accessor((row) => row.team.name, {
    id: 'team',
    header: () => <span>{t('team')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.location, {
    id: 'location',
    header: () => <span>{t('location')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.user.name, {
    id: 'requester',
    header: () => <span>{t('requester')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'amount',
    header: () => <span>{t('staft_required')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.total_candidates_recruited, {
    id: 'total_candidates_recruited',
    header: () => <span>{t('hired')}</span>,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    size: 200,
    header: () => <span>{t('created_date')}</span>,
    cell: (info) => (
      <StyleTinyText>
        {format(new Date(info.getValue()), 'HH:mm, dd/MM/yyyy')}
      </StyleTinyText>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    size: 200,
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    cell: (info) => (
      <ChipFieldStatus
        label={STATUS_STYLE[info.getValue()].text}
        style={{
          backgroundColor: STATUS_STYLE[info.getValue()].backgroundColor,
          color: STATUS_STYLE[info.getValue()].color,
        }}
      />
    ),
  }),
  columnHelper.accessor('id', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    cell: (info) => {
      const id = info.row.original.id

      return (
        <>
          <ActionGroupButtons<Job>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
