import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import Done from 'shared/components/icons/Done'
import Cancel from 'shared/components/icons/Cancel'
import _ from 'lodash'
import { CalendarEvent } from 'features/calendars/presentation/page-sections/google-calendar/interface'
import { isPast } from 'shared/utils/date'
import dayjs from 'dayjs'

export enum ActionInterview {
  EDIT = 'edit',
  DELETE = 'delete',
  DONE = 'done',
  CANCEL = 'cancel',
}

type UseBuildActionsTableInterviewProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleCancelCandidateInterviewStatus: (id: string) => void
  handleDoneCandidateInterviewStatus: (id: string) => void
  status: string
  start_from: string
}

function useBuildActionsTableInterview({
  handleOpenEdit,
  handleOpenDelete,
  handleCancelCandidateInterviewStatus,
  handleDoneCandidateInterviewStatus,
  status,
  start_from,
}: UseBuildActionsTableInterviewProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionInterview, CalendarEvent>({
    actions: {
      done: {
        id: ActionInterview.DONE,
        onClick: (id) => {
          handleDoneCandidateInterviewStatus(id)
        },
        title: translation.COMMON.done,
        Icon: <Done />,
      },
      cancel: {
        id: ActionInterview.CANCEL,
        onClick: (id) => {
          handleCancelCandidateInterviewStatus(id)
        },
        title: translation.COMMON.cancel,
        Icon: <Cancel />,
      },
      edit: {
        id: ActionInterview.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionInterview.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })

  if (!isPast(dayjs(start_from).toDate())) {
    _.remove(
      actions,
      (action) =>
        action.id === ActionInterview.EDIT ||
        action.id === ActionInterview.DELETE
    )
  }
  if (status === 'invited_to_interview') {
    _.remove(actions, (action) => action.id === ActionInterview.DONE)
  }
  if (status === 'done' || status === 'cancelled') {
    _.remove(
      actions,
      (action) =>
        action.id === ActionInterview.DONE ||
        action.id === ActionInterview.CANCEL
    )
  }
  return {
    actions,
  }
}

export default useBuildActionsTableInterview
