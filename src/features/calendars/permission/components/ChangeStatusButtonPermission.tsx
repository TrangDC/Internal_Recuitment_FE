import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import AppButton from 'shared/components/buttons/AppButton'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CandidateInterviewStatus } from 'shared/schema/database/candidate_interview'
import User from 'shared/schema/database/user'

type ChangeStatusButtonPermissionProps = {
  status: CandidateInterviewStatus
  interviewer: User[]
  candidateJobOfTeamId: string
  onDone: () => void
  onCancel: () => void
}

function ChangeStatusButtonPermission({
  status,
  interviewer,
  candidateJobOfTeamId,
  onCancel,
  onDone,
}: ChangeStatusButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === candidateJobOfTeamId
  const isInterviewer = !!interviewer?.find(
    (interviewer) => interviewer.id === user?.id
  )
  const changeStatusPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CHANGE_INTERVIEW.everything',
        'CHANGE_INTERVIEW.ownedOnly',
        'CHANGE_INTERVIEW.teamOnly',
      ],
    },
    module: 'INTERVIEWS',
  })

  const changeStatusTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_INTERVIEW.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const changeStatusOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_INTERVIEW.ownedOnly'],
    },
    module: 'INTERVIEWS',
  })

  if (!changeStatusPermission) return null
  if (changeStatusTeamOnly && !inTeam) return null
  if (changeStatusOwnedOnly && !isInterviewer) return null
  return (
    <FlexBox padding={1.5} gap={1} justifyContent={'flex-end'}>
      {status === 'invited_to_interview' && (
        <AppButton variant="outlined" size="small" onClick={onCancel}>
          Cancel Interview
        </AppButton>
      )}
      {status === 'interviewing' && (
        <>
          <AppButton variant="outlined" size="small" onClick={onCancel}>
            Cancel Interview
          </AppButton>
          <AppButton variant="contained" size="small" onClick={onDone}>
            Done
          </AppButton>
        </>
      )}
    </FlexBox>
  )
}

export default ChangeStatusButtonPermission
