import Candidate from './candidate'
import User from './user'

export interface CandidateHistoryCall {
  id: string
  name: string
  candidate_id: string
  type: CandidateHistoryCallTypeEnum
  contact_to: string
  date: string
  start_time: string
  end_time: string
  candidate: Candidate
  edited: boolean
  description: string
  created_by: User
  createdAt: string
  updatedAt: string
}

export enum CandidateHistoryCallTypeEnum {
  CANDIDATE = 'candidate',
  OTHERS = 'others',
}
