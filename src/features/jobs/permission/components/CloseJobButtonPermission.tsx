import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { checkDisabledActionJobButton } from 'features/jobs/shared/utils'
import checkCloseJobPermission from 'features/permissions/jobs/checkCloseJobPermission'
import AppButton from 'shared/components/buttons/AppButton'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'

type CloseJobButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenClose: (id: string) => void
}

function CloseJobButtonPermission({
  jobDetail,
  handleOpenClose,
}: CloseJobButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam =
    user?.teamId === jobDetail.hiring_team?.id ||
    user?.rectTeamId === jobDetail?.rec_team?.id
  const isOwner = user?.id === jobDetail?.user?.id
  const status = jobDetail?.status
  const isRecInCharge = user?.id === jobDetail?.rec_in_charge?.id
  const hasPermission = checkCloseJobPermission({
    role,
    isRecInCharge,
    isRequester: isOwner,
    inTeam,
  })
  if (!hasPermission) return null
  return (
    <AppButton
      onClick={() => {
        handleOpenClose(jobDetail?.id)
      }}
      disabled={checkDisabledActionJobButton('close', status)}
      variant="outlined"
    >
      <Span>Close request</Span>
    </AppButton>
  )
}

export default CloseJobButtonPermission
