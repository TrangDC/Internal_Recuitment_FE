import User from './user'

interface HiringJobStep {
  id: string
  status: HiringJobStepStatusEnum
  approver: User
  order_id: number
  created_at: string
  updated_at: string
}

export enum HiringJobStepStatusEnum {
  WAITING = 'waiting',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export default HiringJobStep
