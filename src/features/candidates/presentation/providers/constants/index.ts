import { STATUS_CANDIDATE } from "shared/constants/constants"

export const CANDIDATE_STATUS = {
  applied: {text: 'Applied', backgroundColor: '#FFAF46'},
  interviewing: {text: 'Interviewing', backgroundColor: '#5CBAFE'}, 
  offering: {text: 'Offering', backgroundColor: '#20A4A9'},
  hired: {text: 'Hired', backgroundColor: '#7874FE'},
  kiv: {text: 'KIV', backgroundColor: '#FF9777'},
  offer_lost: {text: 'Offered lost', backgroundColor: '#82868C'},
  ex_staff: {text: 'Ex-staff', backgroundColor: '#FC105C'},
  new: {text: 'New', backgroundColor: '#2CC5BD'},
}

export const STATUS_CANDIDATE_DATA = [
  {name: 'APPLIED', value: STATUS_CANDIDATE.APPLIED},
  {name: 'INTERVIEWING', value: STATUS_CANDIDATE.INTERVIEWING},
  {name: 'OFFERING', value: STATUS_CANDIDATE.OFFERING},
  {name: 'HIRED', value: STATUS_CANDIDATE.HIRED},
  {name: 'KIV', value: STATUS_CANDIDATE.KIV},
  {name: 'OFFERED LOST', value: STATUS_CANDIDATE.OFFERED_LOST},
  {name: 'EX-STAFTT', value: STATUS_CANDIDATE.EX_STAFTT},
  {name: 'NEW', value: STATUS_CANDIDATE.NEW},
]

export const STATUS_CANDIDATE_HIRING = [
  {name: 'APPLIED', value: STATUS_CANDIDATE.APPLIED},
  {name: 'INTERVIEWING', value: STATUS_CANDIDATE.INTERVIEWING},
  {name: 'OFFERING', value: STATUS_CANDIDATE.OFFERING},
  {name: 'HIRED', value: STATUS_CANDIDATE.HIRED},
  {name: 'KIV', value: STATUS_CANDIDATE.KIV},
  {name: 'EX-STAFTT', value: STATUS_CANDIDATE.EX_STAFTT},
]




