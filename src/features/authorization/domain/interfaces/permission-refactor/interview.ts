import { GenerateAction } from '.'

export const INTERVIEW_ACTIONS = {
  VIEW: 'GetCandidateInterview,GetAllCandidateInterviews,GetAllCandidateInterview4Calendar',
  CREATE: 'CreateCandidateInterview,CreateCandidateInterview4Calendar',
  EDIT: 'UpdateCandidateInterview,UpdateCandidateInterviewSchedule',
  DELETE: 'DeleteCandidateInterview',
  INTERVIEWING: 'BeInterviewer',
  CHANGE_INTERVIEW: 'UpdateCandidateInterviewStatus',
}
export interface InterviewPermissions
  extends GenerateAction<keyof typeof INTERVIEW_ACTIONS> {}
