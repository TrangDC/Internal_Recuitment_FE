import { GenerateAction } from '.'

export const JOBS_ACTIONS = {
  VIEW: 'GetHiringJob,GetAllHiringJobs',
  CREATE: 'CreateHiringJob',
  EDIT_PENDING_APPROVAL: 'UpdatePendingApprovalsHiringJob',
  EDIT_OPENING_JOB: 'UpdateOpenedHiringJob',
  CANCEL_JOB: 'CancelHiringJob',
  REOPEN_JOB: 'ReopenHiringJob',
  DELETE: 'DeleteHiringJob',
  CLOSE_JOB: 'CloseHiringJob',
}
export interface JobsPermissions
  extends GenerateAction<keyof typeof JOBS_ACTIONS> {}
