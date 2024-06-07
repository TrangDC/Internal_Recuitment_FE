import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { Candidate } from 'features/candidates/domain/interfaces'
import { CANDIDATE_STATUS } from './index'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { t } from 'i18next';
import { LinkText, StyleTinyText } from 'shared/styles'

const columnHelper = createColumnHelper<Candidate>()

export const columns = (
  actions: TOptionItem<Candidate>[]
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <LinkText to={`/dashboard/candidate-detail/${info.row.original.id}`}>{info.getValue()}</LinkText>,
    header: () => <span>{t('name')}</span>,
    meta: {
      style: {
        width: '400px'
      }
    }
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    header: () => <span>{t('email')}</span>,
    meta: {
      style: {
        width: '500px'
      }
    },
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.phone, {
    id: 'phone',
    header: () => <span>{t('phone_number')}</span>,
    meta: {
      style: {
        width: '400px'
      }
    },
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    meta: {
      style: {
        width: '200px'
      }
    },
    cell: (info) => {
      //@ts-ignore
      const status = CANDIDATE_STATUS[info.getValue()]

      return (
        <ChipFieldStatus
          label={status.text}
          style={{
            backgroundColor: status.backgroundColor,
            color: 'white',
          }}
        />
      )
    },
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
          <ActionGroupButtons<Candidate>
            rowId={id}
            actions={actions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]

