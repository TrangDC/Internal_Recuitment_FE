import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkReopenJobPermission from 'features/permissions/jobs/checkReopenJobPermission'
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
  const isOwner = user?.id === jobDetail.user.id
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
