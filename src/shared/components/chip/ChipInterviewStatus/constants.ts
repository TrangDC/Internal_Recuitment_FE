const INTERVIEW_STATUS = {
  INVITED_TO_INTERVIEW: 'invited_to_interview',
  INTERVIEWING: 'interviewing',
  DONE: 'done',
  CANCELLED: 'cancelled',
}

const STATUS_STYLE = {
  [INTERVIEW_STATUS.INVITED_TO_INTERVIEW]: {
    backgroundColor: '#FFAF46',
    color: 'white',
    text: 'Invited to Interview',
  },
  [INTERVIEW_STATUS.INTERVIEWING]: {
    backgroundColor: '#5CBAFE',
    color: 'white',
    text: 'Interviewing',
  },
  [INTERVIEW_STATUS.CANCELLED]: {
    backgroundColor: '#82868C',
    color: 'white',
    text: 'Cancelled',
  },
  [INTERVIEW_STATUS.DONE]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Done',
  },
}

export class InterviewStatus {
  static INTERVIEW_STATUS = INTERVIEW_STATUS
  static STATUS_STYLE = STATUS_STYLE

  static getDataByStatus(status: string): InterviewStatus {
    return this.STATUS_STYLE[status]
  }
}
