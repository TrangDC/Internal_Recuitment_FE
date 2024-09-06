import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { checkDisabledActionJobButton } from 'features/jobs/shared/utils'
import checkReopenJobPermission from 'features/permissions/jobs/checkReopenJobPermission'
import AppButton from 'shared/components/buttons/AppButton'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'

type ReopenButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenReopen: (id: string) => void
}

function ReopenButtonPermission({
  jobDetail,
  handleOpenReopen,
}: ReopenButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam =
    user?.teamId === jobDetail.hiring_team?.id ||
    user?.rectTeamId === jobDetail?.rec_team?.id
  const isOwner = user?.id === jobDetail?.user?.id
  const status = jobDetail?.status
  const recInChargeId = jobDetail?.rec_in_charge?.id
  const isRecInCharge = user?.id === recInChargeId
  const hasPermission = checkReopenJobPermission({
    inTeam,
    isRequester: isOwner,
    role,
    isRecInCharge,
  })
  if (!hasPermission) return null
  return (
    <AppButton
      onClick={() => {
        handleOpenReopen(jobDetail?.id)
      }}
      disabled={checkDisabledActionJobButton('reopen', status)}
      variant="outlined"
    >
      <Span>Reopen</Span>
    </AppButton>
  )
}

export default ReopenButtonPermission
