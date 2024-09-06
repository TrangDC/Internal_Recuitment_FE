import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkEditApprovalAndOpenJobPermission from 'features/permissions/jobs/checkEditApprovalAndOpenJobPermission'
import EditIcon from 'shared/components/icons/EditIcon'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import HiringJob from 'shared/schema/database/hiring_job'

type EditJobPermissionsProps = {
  onClick: () => void
  jobDetails: HiringJob
}

function EditJobPermissions({ onClick, jobDetails }: EditJobPermissionsProps) {
  const { role, user } = useAuthorization()
  const inTeam =
    user?.teamId === jobDetails?.hiring_team?.id ||
    user?.rectTeamId === jobDetails?.rec_team?.id
  const status = jobDetails.status
  const isOwner = user?.id === jobDetails?.user?.id
  const hasPermissions = checkEditApprovalAndOpenJobPermission({
    inTeam,
    isOwner,
    role,
    status,
  })
  if (!hasPermissions) return null
  return (
    <ButtonAdd
      icon_style={{
        color: 'white !important',
      }}
      Icon={EditIcon}
      textLable="Edit"
      onClick={onClick}
    ></ButtonAdd>
  )
}

export default EditJobPermissions
