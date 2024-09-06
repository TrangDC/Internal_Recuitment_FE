import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { checkDisabledActionJobButton } from 'features/jobs/shared/utils'
import checkCancelJobPermission from 'features/permissions/jobs/checkCancelJobPermission'
import AppButton from 'shared/components/buttons/AppButton'
import { Span } from 'shared/components/Typography'
import HiringJob from 'shared/schema/database/hiring_job'

type CancelButtonPermissionProps = {
  jobDetail: HiringJob
  handleOpenCancel: (id: string) => void
}

function CancelButtonPermission({
  jobDetail,
  handleOpenCancel,
}: CancelButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam =
    user?.teamId === jobDetail.hiring_team?.id ||
    user?.rectTeamId === jobDetail?.rec_team?.id
  const isRequester = user?.id === jobDetail?.user?.id
  const status = jobDetail?.status
  const isRecInCharge = user?.id === jobDetail?.rec_in_charge?.id
  const hasPermission = checkCancelJobPermission({
    inTeam,
    isRecInCharge,
    isRequester,
    role,
  })
  const is_able_to_cancel = jobDetail?.is_able_to_cancel === false
  if (!hasPermission) return null
  return (
    <AppButton
      onClick={() => {
        handleOpenCancel(jobDetail?.id)
      }}
      disabled={
        checkDisabledActionJobButton('cancel', status) || is_able_to_cancel
      }
      variant="outlined"
    >
      <Span>Cancel request</Span>
    </AppButton>
  )
}

export default CancelButtonPermission
