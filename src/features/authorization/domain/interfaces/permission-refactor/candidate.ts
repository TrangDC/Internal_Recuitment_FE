import { GenerateAction } from '.'

export const CANDIDATE_ACTIONS = {
  VIEW: 'GetCandidate,GetAllCandidates',
  CREATE: 'CreateCandidate',
  EDIT: 'UpdateCandidate',
  ADD_REMOVE_BLACK_LIST: 'SetBlackListCandidate',
  DELETE: 'DeleteCandidate',
}
export interface CandidatePermissions
  extends GenerateAction<keyof typeof CANDIDATE_ACTIONS> {}
