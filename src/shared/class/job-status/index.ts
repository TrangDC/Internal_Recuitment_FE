import { HiringJobStatus } from 'shared/schema/database/hiring_job'

const STATUS_HIRING_JOB = {
  PENDING_APPROVALS: 'pending_approvals',
  OPENED: 'opened',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
}

const STATUS_STYLE = {
  [STATUS_HIRING_JOB.PENDING_APPROVALS]: {
    backgroundColor: '#FFAF46',
    color: 'white',
    text: 'Pending approvals',
  },
  [STATUS_HIRING_JOB.OPENED]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Opening',
  },
  [STATUS_HIRING_JOB.CLOSED]: {
    backgroundColor: '#ff9777',
    color: 'white',
    text: 'Closed',
  },
  [STATUS_HIRING_JOB.CANCELLED]: {
    backgroundColor: '#82868c',
    color: 'white',
    text: 'Cancelled',
  },
}

export class JobStatus {
  static STATUS_HIRING_JOB = STATUS_HIRING_JOB
  static STATUS_STYLE = STATUS_STYLE

  static getDataByStatus(status: HiringJobStatus) {
    return this.STATUS_STYLE[status]
  }
}
