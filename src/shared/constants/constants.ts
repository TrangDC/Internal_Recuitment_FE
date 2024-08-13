import { Theme } from '@mui/material'

export const THEMES = { LIGHT: 'light', DARK: 'dark' }

export const lightTheme = (theme: Theme) => theme.palette.mode === 'light'

export const secondarySideBarWidth = 215
export const secondarySideBarGap = 80

export const SORT_BY = {
  DESC: 'DESC',
  ASC: 'ASC',
}

export const SALARY_STATE = {
  RANGE: 'range',
  UP_TO: 'up_to',
  MINIMUM: 'minimum',
  NEGOTITATION: 'negotiate',
}

export const SALARY_TYPE_TEXT = {
  range: 'Range',
  up_to: 'Up to',
  minimum: 'Minimum',
  negotiate: 'Negotiate'
}

export const CURRENCY_STATE = {
  VND: 'vnd',
  USD: 'usd',
  JPY: 'jpy',
}

export const CURRENCY_TEXT_LABEL = {
  vnd: 'VND',
  usd: 'USD',
  jpy: 'JPY',
}

export const LOCATION_STATE = {
  HA_NOI: 'ha_noi',
  DA_NANG: 'da_nang',
  HO_CHI_MINH: 'ho_chi_minh',
  JAPAN: 'japan',
  SINGAPORE: 'singapore'
}

export const LOCATION_LABEL = {
  ha_noi: 'Hà Nội',
  da_nang: 'Đà Nẵng',
  ho_chi_minh: 'Hồ Chí Minh',
  japan: 'Japan',
  singapore: 'Singapore',
}

export const STATUS_CANDIDATE = {
  APPLIED: 'applied',
  INTERVIEWING: 'interviewing',
  OFFERING: 'offering',
  HIRED: 'hired',
  KIV: 'kiv',
  OFFERED_LOST: 'offer_lost',
  EX_STAFTT: 'ex_staff',
  NEW: 'new',
}

export const STATUS_CANDIDATE_TEXT = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  offering: 'Offering',
  hired: 'Hired',
  failed_cv: 'Failed CV',
  failed_interview: 'Failed interview',
  offer_lost: 'Offered lost',
  ex_staff: 'Ex-staff',
  new: 'New',
}

export enum ENUM_STATUS_CANDIDATE {
  APPLIED = 'applied',
  INTERVIEWING = 'interviewing',
  OFFERING = 'offering',
  HIRED = 'hired',
  KIV = 'kiv',
  OFFERED_LOST = 'offer_lost',
  EX_STAFTT = 'ex_staff',
  NEW = 'new',
}


export const TREC_REFRESH_TOKEN: string = 'refreshToken'
export const TREC_ACCESS_TOKEN: string = 'accessToken'

export const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'Authorization',
  REFRESHTOKEN: 'x-rtoken-id',
  CONTENT_TYPE: 'Content-Type',
}
