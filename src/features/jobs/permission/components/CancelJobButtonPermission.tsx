import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'
import { BtnPrimary } from 'shared/styles'

type CancelButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenCancel: (id: string) => void
}

function CancelButtonPermission({
  jobDetail,
  handleOpenCancel,
}: CancelButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === jobDetail.hiring_team?.id
  const cancelJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CANCEL_JOB.everything', 'CANCEL_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const reopenJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CANCEL_JOB.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!cancelJobPermission) return null
  if (reopenJobTeamOnly && !inTeam) return null
  return (
    <BtnPrimary
      onClick={() => {
        handleOpenCancel(jobDetail?.id)
      }}
    >
      <Span>Cancel Job</Span>
    </BtnPrimary>
  )
}

export default CancelButtonPermission
