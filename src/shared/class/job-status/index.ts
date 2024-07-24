const STATUS_HIRING_JOB = {
  DRAFT: 'draft',
  OPENED: 'opened',
  CLOSED: 'closed',
}

const STATUS_STYLE = {
  [STATUS_HIRING_JOB.DRAFT]: {
    backgroundColor: '#eff3f5',
    color: 'black',
    text: 'Draft',
  },
  [STATUS_HIRING_JOB.OPENED]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Opening',
  },
  [STATUS_HIRING_JOB.CLOSED]: {
    backgroundColor: '#82868C',
    color: 'white',
    text: 'Closed',
  },
}

export type TYPE_JOB_STATUS = 'draft' | 'opened' | 'closed'

export class JobStatus {
  static STATUS_HIRING_JOB = STATUS_HIRING_JOB
  static STATUS_STYLE = STATUS_STYLE

  static getDataByStatus(status: TYPE_JOB_STATUS) {
    return this.STATUS_STYLE[status]
  }
}
