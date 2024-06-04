import { STATUS_CANDIDATE } from "shared/constants/constants"

export const CANDIDATE_STATUS = {
  applied: {text: 'Applied', backgroundColor: '#FFAF46'},
  interviewing: {text: 'Interviewing', backgroundColor: '#5CBAFE'}, 
  offering: {text: 'Offering', backgroundColor: '#20A4A9'},
  hired: {text: 'Hired', backgroundColor: '#7874FE'},
  kiv: {text: 'KIV', backgroundColor: '#FF9777'},
  offer_lost: {text: 'Offered lost', backgroundColor: '#82868C'},
  ex_staff: {text: 'Ex-staff', backgroundColor: '#000'},
  new: {text: 'New', backgroundColor: '#FC105C'},
}

export const list_status_disabled = {
  [STATUS_CANDIDATE.APPLIED]: [
    STATUS_CANDIDATE.APPLIED,
    STATUS_CANDIDATE.EX_STAFTT,
  ],
  [STATUS_CANDIDATE.INTERVIEWING]: [
    STATUS_CANDIDATE.EX_STAFTT,
    STATUS_CANDIDATE.APPLIED,
    STATUS_CANDIDATE.INTERVIEWING,
  ],
  [STATUS_CANDIDATE.OFFERING]: [
    STATUS_CANDIDATE.APPLIED,
    STATUS_CANDIDATE.INTERVIEWING,
    STATUS_CANDIDATE.OFFERING,
    STATUS_CANDIDATE.KIV,
    STATUS_CANDIDATE.EX_STAFTT,
  ],
  [STATUS_CANDIDATE.HIRED]: [
    STATUS_CANDIDATE.APPLIED,
    STATUS_CANDIDATE.INTERVIEWING,
    STATUS_CANDIDATE.OFFERING,
    STATUS_CANDIDATE.HIRED,
    STATUS_CANDIDATE.KIV,
    STATUS_CANDIDATE.OFFERED_LOST,
  ],
}



