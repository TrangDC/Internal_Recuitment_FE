import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionAllJobsTable } from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import checkCancelJobPermission from 'features/permissions/jobs/checkCancelJobPermission'
import checkCloseJobPermission from 'features/permissions/jobs/checkCloseJobPermission'
import checkDeleteJobPermission from 'features/permissions/jobs/checkDeleteJobPermission'
import checkEditApprovalAndOpenJobPermission from 'features/permissions/jobs/checkEditApprovalAndOpenJobPermission'
import checkReopenJobPermission from 'features/permissions/jobs/checkReopenJobPermission'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import HiringJob, { HiringJobStatus } from 'shared/schema/database/hiring_job'

interface ActionProps {
  newActions: TOptionItem<HiringJob>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
  status: HiringJobStatus
  isRequester: boolean
  isRecInCharge: boolean
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<HiringJob>): TOptionItem<HiringJob>[] {
  let newActions = [...actions]
  const job = rowData.row.original
  const recInChargeId = job?.rec_in_charge?.id
  const status = job.status
  const inTeam =
    me?.teamId === job.hiring_team.id || me?.rectTeamId === job?.rec_team?.id
  const isRequester = me?.id === job.user.id
  const isRecInCharge = me?.id === recInChargeId
  newActions = editAction({
    newActions,
    inTeam,
    role,
    status,
    isRequester,
    isRecInCharge,
  })

  newActions = deleteAction({
    newActions,
    inTeam,
    role,
    status,
    isRequester,
    isRecInCharge,
  })
  newActions = closeJobsAction({
    newActions,
    inTeam,
    role,
    status,
    isRequester,
    isRecInCharge,
  })
  newActions = reopenJobsAction({
    newActions,
    inTeam,
    role,
    status,
    isRequester,
    isRecInCharge,
  })
  newActions = cancelJobsAction({
    newActions,
    inTeam,
    role,
    status,
    isRequester,
    isRecInCharge,
  })
  return newActions
}

function editAction({
  newActions,
  inTeam,
  role,
  status,
  isRequester,
}: ActionProps) {
  const hasEditPermission = checkEditApprovalAndOpenJobPermission({
    inTeam,
    isOwner: isRequester,
    role,
    status,
  })

  if (!hasEditPermission)
    return newActions.filter((action) => action.id !== ActionAllJobsTable.EDIT)
  return newActions
}

function deleteAction({
  newActions,
  role,
  inTeam,
  isRequester,
  isRecInCharge,
}: ActionProps) {
  const hasDeletePermission = checkDeleteJobPermission({
    inTeam,
    isRequester,
    isRecInCharge,
    role,
  })
  if (!hasDeletePermission)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.DELETE
    )
  return newActions
}

function closeJobsAction({
  newActions,
  role,
  inTeam,
  isRecInCharge,
  isRequester,
}: ActionProps) {
  const hasCloseJob = checkCloseJobPermission({
    inTeam,
    isRequester,
    isRecInCharge,
    role,
  })
  if (!hasCloseJob)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CLOSE_JOB
    )
  return newActions
}

function reopenJobsAction({
  newActions,
  role,
  inTeam,
  isRecInCharge,
  isRequester,
}: ActionProps) {
  const hasReopenJob = checkReopenJobPermission({
    inTeam,
    isRequester,
    role,
    isRecInCharge,
  })
  if (!hasReopenJob)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.REOPEN
    )
  return newActions
}

function cancelJobsAction({
  newActions,
  role,
  inTeam,
  isRecInCharge,
  isRequester,
}: ActionProps) {
  const hasCancelJob = checkCancelJobPermission({
    inTeam,
    isRequester,
    role,
    isRecInCharge,
  })

  if (!hasCancelJob)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CANCEL
    )
  return newActions
}

export default checkPermissionActionTable
