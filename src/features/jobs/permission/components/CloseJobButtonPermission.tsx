import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkCloseJobPermission from 'features/permissions/jobs/checkCloseJobPermission'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'
import { BtnPrimary } from 'shared/styles'

type CloseJobButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenClose: (id: string) => void
}

function CloseJobButtonPermission({
  jobDetail,
  handleOpenClose,
}: CloseJobButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === jobDetail.hiring_team?.id
  const isOwner = user?.id === jobDetail.user.id
  const isRecInCharge = user?.id === jobDetail?.rec_in_charge?.id
  const hasPermission = checkCloseJobPermission({
    role,
    isRecInCharge,
    isRequester: isOwner,
    inTeam,
  })
  if (!hasPermission) return null
  return (
    <BtnPrimary
      onClick={() => {
        handleOpenClose(jobDetail?.id)
      }}
    >
      <Span>Close Job</Span>
    </BtnPrimary>
  )
}

export default CloseJobButtonPermission
