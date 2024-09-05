import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionAllJobsTable } from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import checkCancelJobPermission from 'features/permissions/jobs/checkCancelJobPermission'
import checkCloseJobPermission from 'features/permissions/jobs/checkCloseJobPermission'
import checkDeleteJobPermission from 'features/permissions/jobs/checkDeleteJobPermission'
import checkEditApprovalAndOpenJobPermission from 'features/permissions/jobs/checkEditApprovalAndOpenJobPermission'
import checkEditApprovalJobPermission from 'features/permissions/jobs/checkEditApprovalJobPermission'
import checkEditRequestJobPermission from 'features/permissions/jobs/checkEditRequestJobPermission'
import checkReopenJobPermission from 'features/permissions/jobs/checkReopenJobPermission'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import HiringJob, { HiringJobStatus } from 'shared/schema/database/hiring_job'

interface ActionProps {
  newActions: TOptionItem<HiringJob>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
  status: HiringJobStatus
  isOwner: boolean
  isRecInCharge: boolean
}

function checkPermissionActionTableKanban({
  role,
  me,
  actions,
  rowData,
}: {
  role: PermissionStructureImpl | null
  me: MyBasicInformation | null
  actions: TOptionItem<HiringJob>[]
  rowData: HiringJob
}): TOptionItem<HiringJob>[] {
  let newActions = [...actions]
  const job = rowData
  console.log('job', job)
  const inTeam =
    me?.teamId === job.hiring_team.id || me?.rectTeamId === job?.rec_team?.id
  const recInChargeId = job?.rec_in_charge?.id
  const status = job.status
  const isOwner = me?.id === job?.user?.id
  const isRecInCharge = me?.id === recInChargeId
  newActions = editAction({
    newActions,
    inTeam,
    role,
    isOwner,
    isRecInCharge,
    status,
  })
  newActions = deleteAction({
    newActions,
    inTeam,
    role,
    isOwner,
    isRecInCharge,
    status,
  })
  newActions = closeJobsAction({
    newActions,
    inTeam,
    role,
    isOwner,
    isRecInCharge,
    status,
  })
  newActions = reopenJobsAction({
    newActions,
    inTeam,
    role,
    isOwner,
    isRecInCharge,
    status,
  })
  newActions = cancelJobsAction({
    newActions,
    inTeam,
    role,
    isOwner,
    isRecInCharge,
    status,
  })
  return newActions
}

function editAction({
  newActions,
  inTeam,
  role,
  isOwner,
  status,
}: ActionProps) {
  const hasEditPermission = checkEditApprovalAndOpenJobPermission({
    inTeam,
    isOwner,
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
  isOwner,
  isRecInCharge,
}: ActionProps) {
  const hasDeletePermission = checkDeleteJobPermission({
    inTeam,
    isRequester: isOwner,
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
  isOwner,
  isRecInCharge,
}: ActionProps) {
  const hasCloseJob = checkCloseJobPermission({
    inTeam,
    isRequester: isOwner,
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
  isOwner,
  isRecInCharge,
}: ActionProps) {
  const hasReopenJob = checkReopenJobPermission({
    inTeam,
    isRequester: isOwner,
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
  isOwner,
  isRecInCharge,
}: ActionProps) {
  const hasCancelJob = checkCancelJobPermission({
    inTeam,
    isRequester: isOwner,
    role,
    isRecInCharge,
  })

  if (!hasCancelJob)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CANCEL
    )
  return newActions
}

export default checkPermissionActionTableKanban
