import { GenerateAction } from '.'

export const CANDIDATE_JOB_ACTIONS = {
  VIEW: 'GetCandidateJob,GetAllCandidateJobs,GetCandidateJobGroupByStatus,GetCandidateJobGroupByInterview',
  CREATE: 'CreateCandidateJob',
  EDIT: 'UpdateCandidateJobAttachment',
  DELETE: 'DeleteCandidateJob',
  CHANGE_STATUS: 'UpdateCandidateJobStatus',
}

export interface CandidateJobPermissions
  extends GenerateAction<keyof typeof CANDIDATE_JOB_ACTIONS> {}
