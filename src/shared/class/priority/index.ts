export const PRIORITY_STATE = {
  URGENT: 1,
  HIGHT: 2,
  MEDIUM: 3,
  LOW: 4,
}

export const getPriorityByStatus = (status: string): number => {
  switch(status) {
    case 'urgent': 
      return 1;
    case 'hight':
      return 2;
    case 'medium':
      return 3;
    case 'low':
    default:
      return 4;
  }
}

export const PRIORITY_STYLE = {
  1: { label: 'Urgent', backgroundColor: '#E50000', color: '#FFFFFF' },
  2: { label: 'High', backgroundColor: '#FC105C', color: '#FFFFFF' },
  3: { label: 'Medium', backgroundColor: '#FFAF46', color: '#FFFFFF' },
  4: { label: 'Low', backgroundColor: '#5CBAFE', color: '#FFFFFF' },
}

export type TYPE_PRIORITY_STATUS = 1 | 2 | 3 | 4
