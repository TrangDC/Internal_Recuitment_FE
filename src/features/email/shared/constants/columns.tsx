import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import { t } from 'i18next'
import { StyleTinyText } from 'shared/styles'
import { Box } from '@mui/material'
import AntSwitch from 'shared/components/ant-switch'
import EmailTemplate from 'shared/schema/database/email_template'
import { renderDescription } from 'features/auditTrails/presentation/providers/helper'
import { EVENT_EMAIL } from 'shared/components/autocomplete/event-email-autocomplete'
import { GroupSendToAndRole } from '../utils'
import changeStatusEmail from '../services/changeStatusEmail'
import checkPermissionActionTable from 'features/email/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'

const columnHelper = createColumnHelper<EmailTemplate>()

export const columns = (
  actions: TOptionItem<EmailTemplate>[],
  {me, role}: ParamsColumn
): ColumnDef<EmailTemplate, any>[] => [
  columnHelper.accessor((row) => row.status, {
    id: 'name',
    cell: (info) => {
      const status = info.row.original?.status;
      const id = info.row.original?.id;

      return (
        <Box>
          <AntSwitch
            onChange={(event) => {
              const status = event.target.checked ? 'active' : 'inactive'
              changeStatusEmail(id, status)
            }}
            checked={status === 'active'}
          />
        </Box>
      )
    },
    header: () => <span></span>,
    size: 50,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.event, {
    id: 'members',
    size: 200,
    cell: (info) => {
      return (
        <StyleTinyText>
          {EVENT_EMAIL[info.row.original.event]?.label}
        </StyleTinyText>
      )
    },
    header: () => <span>Event</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('send_to', {
    header: () => <span>Send to</span>,
    size: 200,
    cell: (info) => {
      const send_to = GroupSendToAndRole(info.row.original.send_to,  info.row.original.roles)

      return <StyleTinyText>{send_to.join(', ')}</StyleTinyText>
    },
    enableSorting: false,
  }),
  columnHelper.accessor('subject', {
    header: () => <span>Email subject</span>,
    size: 200,
    cell: (info) => (
      <StyleTinyText>{renderDescription(info.getValue())}</StyleTinyText>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('created_at', {
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
        <>
          <ActionGroupButtons<EmailTemplate>
            rowId={id}
            actions={newActions}
            rowData={info.row.original}
          />
        </>
      )
    },
  }),
]
