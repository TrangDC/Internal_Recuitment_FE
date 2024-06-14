const STATUS_STATE = {
  DRAFT: 'draft',
  OPENED: 'opened',
  CLOSED: 'closed',
}

const STATUS_STYLE = {
  [STATUS_STATE.DRAFT]: {
    backgroundColor: '#eff3f5',
    color: 'black',
    text: 'Draft',
  },
  [STATUS_STATE.OPENED]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Opening',
  },
  [STATUS_STATE.CLOSED]: {
    backgroundColor: '#82868C',
    color: 'white',
    text: 'Closed',
  },
}

type TYPE_JOB_STATUS = 'draft' | 'opened' | 'closed'

export class JobStatus {
  static STATUS_STATE = STATUS_STATE
  static STATUS_STYLE = STATUS_STYLE

  static getDataByStatus(status: TYPE_JOB_STATUS) {
    return this.STATUS_STYLE[status]
  }
}
