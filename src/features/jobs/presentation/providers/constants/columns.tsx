import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { Job } from 'features/jobs/domain/interfaces'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { STATUS_STYLE } from './index'
import { t } from 'i18next'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { PRIORITY_DATA } from 'shared/components/autocomplete/priority-auto-complete'
import { LinkText, StyleTinyText } from 'shared/styles'

const columnHelper = createColumnHelper<Job>()

export const columns = (actions: TOptionItem<Job>[]): ColumnDef<Job, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={`/dashboard/job-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>Job name</span>,
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
    cell: (info) => (
      <StyleTinyText>
        {/* @ts-ignore */}
        {LOCATION_LABEL[info.getValue()]}
      </StyleTinyText>
    ),
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
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    size: 150,
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
  columnHelper.accessor((row) => row.priority, {
    id: 'priority',
    size: 150,
    header: () => <span>Priority</span>,
    cell: (info) => (
      <ChipFieldStatus
        //@ts-ignore
        label={PRIORITY_DATA[info.getValue()].label}
        style={{
          //@ts-ignore
          backgroundColor: PRIORITY_DATA[info.getValue()].backgroundColor,
          //@ts-ignore
          color: PRIORITY_DATA[info.getValue()].color,
        }}
      />
    ),
  }),
  columnHelper.accessor('created_at', {
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
