import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import Cant from 'features/authorization/presentation/components/Cant'
import { Job } from 'features/jobs/domain/interfaces'
import { Span } from 'shared/components/Typography'
import { BtnPrimary } from 'shared/styles'

type CloseJobButtonPermissionProps = {
  jobDetail: Job
  disabledBtn: boolean
  opened: string
  handleOpenStatus: (id: string) => void
}

function CloseJobButtonPermission({
  jobDetail,
  disabledBtn,
  opened,
  handleOpenStatus,
}: CloseJobButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === jobDetail.team?.id
  const closeJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.everything', 'CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const closeJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!closeJobPermission) return null
  if (closeJobTeamOnly && !inTeam) return null
  return (
    <BtnPrimary
      onClick={() => {
        if (disabledBtn) return
        handleOpenStatus(jobDetail?.id)
      }}
      className={disabledBtn ? 'disabled' : ''}
    >
      <Span>{jobDetail.status === opened ? 'Close Job' : 'Reopen Job'}</Span>
    </BtnPrimary>
  )
}

export default CloseJobButtonPermission
