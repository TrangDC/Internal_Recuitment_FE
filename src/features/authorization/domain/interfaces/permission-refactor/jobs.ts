import { GenerateAction } from '.'

export const JOBS_ACTIONS = {
  VIEW: 'GetHiringJob,GetAllHiringJobs',
  CREATE: 'CreateHiringJob',
  EDIT: 'UpdateHiringJob',
  DELETE: 'DeleteHiringJob',
  CLOSE_JOB: 'UpdateHiringJobStatus',
}
export interface JobsPermissions
  extends GenerateAction<keyof typeof JOBS_ACTIONS> {}
