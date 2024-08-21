import { GenerateAction } from '.'

export const CANDIDATE_ACTIVITIES_ACTIONS = {
  VIEW: 'GetCandidateActivities',
  CREATE: 'CreateCandidateHistoryCall,CreateCandidateNote',
  EDIT: 'UpdateCandidateHistoryCall,UpdateCandidateNote',
  DELETE: 'DeleteCandidateHistoryCall,DeleteCandidateNote',
}

export interface CandidateActivitiesPermissions
  extends GenerateAction<keyof typeof CANDIDATE_ACTIVITIES_ACTIONS> {}
