import { OutgoingEmailStatus } from 'shared/schema/database/out_going_email'

type StatusStyle = {
  backgroundColor: string
  color: string
  text: string
}

const STATUS_STYLE = {
  [OutgoingEmailStatus.FAILED]: {
    backgroundColor: '#FC105C',
    color: 'white',
    text: 'Failed',
  },
  [OutgoingEmailStatus.PENDING]: {
    backgroundColor: '#5CBAFE',
    color: 'white',
    text: 'Pending',
  },
  [OutgoingEmailStatus.SENT]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Delivered',
  },
}

export class EmailStatus {
  static getDataByStatus(status: OutgoingEmailStatus): StatusStyle {
    return STATUS_STYLE[status] as StatusStyle
  }
}
