import { Interview } from 'features/interviews/domain/interfaces'
import { ActionGroupButtons } from 'shared/components/ActionGroupButtons'
import useBuildActionsTableInterview from 'features/interviews/hooks/table/useBuildActionsTableInterview'
import { UseActionInterviewReturn } from 'features/interviews/hooks/table/useActionInterview'
import checkActionPermissionInterview from 'features/interviews/permission/utils/checkActionPermissionCalendar'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'

type InterviewActionsProps = {
  useActionInterviewReturn: UseActionInterviewReturn
  interview: Interview
  candidateJobOfTeamId: string
}

function InterviewActions(props: InterviewActionsProps) {
  const { useActionInterviewReturn, interview, candidateJobOfTeamId } = props
  const {
    handleOpenEdit,
    handleOpenDelete,
    handleCancelCandidateInterviewStatus,
    handleDoneCandidateInterviewStatus,
  } = useActionInterviewReturn

  const { role, user } = useAuthorization()

  const { actions } = useBuildActionsTableInterview({
    status: interview.status,
    handleCancelCandidateInterviewStatus,
    handleDoneCandidateInterviewStatus,
    handleOpenDelete,
    handleOpenEdit,
  })

  const newActions = checkActionPermissionInterview({
    actions,
    me: user,
    role,
    interviewer: interview?.interviewer ?? [],
    candidateJobOfTeamId,
  })
  return (
    <ActionGroupButtons<Interview>
      rowId={interview.id}
      actions={newActions}
      rowData={interview}
      iconButtonSx={{
        padding: '0px !important',
      }}
    />
  )
}

export default InterviewActions
