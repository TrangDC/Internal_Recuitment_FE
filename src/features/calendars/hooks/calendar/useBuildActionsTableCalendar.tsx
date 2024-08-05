import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import Done from 'shared/components/icons/Done'
import Cancel from 'shared/components/icons/Cancel'
import { UseActionInterviewReturn } from './useActionInterview'
import _ from 'lodash'
import { CalendarEvent } from 'features/calendars/presentation/page-sections/google-calendar/interface'
import { isPast } from 'shared/utils/date'
import dayjs from 'dayjs'

export enum ActionCalendar {
  EDIT = 'edit',
  DELETE = 'delete',
  DONE = 'done',
  CANCEL = 'cancel',
}

function useBuildActionsTableCalendar({
  handleOpenEdit,
  handleOpenDelete,
  handleCancelCandidateInterviewStatus,
  handleDoneCandidateInterviewStatus,
  event,
}: UseActionInterviewReturn & { event: CalendarEvent }) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionCalendar, CalendarEvent>({
    actions: {
      done: {
        id: ActionCalendar.DONE,
        onClick: (id) => {
          handleDoneCandidateInterviewStatus(id)
        },
        title: translation.COMMON.done,
        Icon: <Done />,
      },
      cancel: {
        id: ActionCalendar.CANCEL,
        onClick: (id) => {
          handleCancelCandidateInterviewStatus(id)
        },
        title: translation.COMMON.cancel,
        Icon: <Cancel />,
      },
      edit: {
        id: ActionCalendar.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionCalendar.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })

  const status = event?.resource?.status
  const start_from = event.start

  if (!isPast(dayjs(start_from).toDate())) {
    _.remove(
      actions,
      (action) =>
        action.id === ActionCalendar.EDIT || action.id === ActionCalendar.DELETE
    )
  }
  if (status === 'invited_to_interview') {
    _.remove(actions, (action) => action.id === ActionCalendar.DONE)
  }
  if (status === 'done' || status === 'cancelled') {
    _.remove(
      actions,
      (action) =>
        action.id === ActionCalendar.DONE || action.id === ActionCalendar.CANCEL
    )
  }
  return {
    actions,
  }
}

export default useBuildActionsTableCalendar
