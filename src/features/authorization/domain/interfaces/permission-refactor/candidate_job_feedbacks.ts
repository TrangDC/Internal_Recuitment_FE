import { GenerateAction } from '.'

export const CANDIDATE_JOB_FEEDBACKS_ACTIONS = {
  VIEW: 'GetCandidateJobFeedback,GetAllCandidateJobFeedbacks',
  CREATE: 'CreateCandidateJobFeedback',
  DELETE: 'DeleteCandidateJobFeedback',
}

export interface CandidateJobFeedbacksPermissions
  extends GenerateAction<keyof typeof CANDIDATE_JOB_FEEDBACKS_ACTIONS> {}
