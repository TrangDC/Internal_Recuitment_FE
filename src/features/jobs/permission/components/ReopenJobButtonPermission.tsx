import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'
import { BtnPrimary } from 'shared/styles'

type ReopenButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenReopen: (id: string) => void
}

function ReopenButtonPermission({
  jobDetail,
  handleOpenReopen,
}: ReopenButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === jobDetail.hiring_team?.id
  const reopenJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.everything', 'CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const reopenJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!reopenJobPermission) return null
  if (reopenJobTeamOnly && !inTeam) return null
  return (
    <BtnPrimary
      onClick={() => {
        handleOpenReopen(jobDetail?.id)
      }}
    >
      <Span>Reopen Job</Span>
    </BtnPrimary>
  )
}

export default ReopenButtonPermission
