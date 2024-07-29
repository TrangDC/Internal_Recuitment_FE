import { UseActionInterviewReturn } from 'features/calendars/hooks/calendar/useActionInterview'
import { CalendarEvent } from '../page-sections/google-calendar/interface'
import { ActionGroupButtonCalendar } from './ActionGroupButtonCalendar'
import { isPast } from 'shared/utils/date'
import useBuildActionsTableCalendar from 'features/calendars/hooks/calendar/useBuildActionsTableCalendar'
import checkActionPermissionCalendar from 'features/calendars/permission/utils/checkActionPermissionCalendar'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'

type CalendarActionsProps = {
  useActionInterviewReturn: UseActionInterviewReturn
  event: CalendarEvent
}

function CalendarActions(props: CalendarActionsProps) {
  const { useActionInterviewReturn, event } = props
  const { actions } = useBuildActionsTableCalendar({
    ...useActionInterviewReturn,
    event,
  })
  const { role, user } = useAuthorization()
  const newActions = checkActionPermissionCalendar({
    actions: actions,
    me: user,
    role,
    rowData: event,
  })
  const start_from = event.start
  if (start_from && !isPast(start_from)) return null
  return (
    <ActionGroupButtonCalendar<CalendarEvent>
      rowId={event.resource?.id ?? ''}
      actions={newActions}
      rowData={event}
      iconButtonSx={{
        padding: '0px !important',
      }}
    />
  )
}

export default CalendarActions
