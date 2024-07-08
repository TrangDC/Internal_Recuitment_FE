import { CSSProperties } from 'react'
import { CURRENCY_STATE, LOCATION_STATE, SALARY_STATE, STATUS_CANDIDATE } from 'shared/constants/constants'
import { t } from 'i18next';

export const SALARY_DATA = [
  {name: 'Range', value: SALARY_STATE.RANGE},
  {name: 'Up to', value: SALARY_STATE.UP_TO},
  {name: 'Minimum', value: SALARY_STATE.MINIMUM},
  {name: 'Negotitation', value: SALARY_STATE.NEGOTITATION},
]

export const CURRENCY_DATA = [
  {name: 'VND', value: CURRENCY_STATE.VND},
  {name: 'USD', value: CURRENCY_STATE.USD},
  {name: 'JPY', value: CURRENCY_STATE.JPY},
]

export const LOCATION_DATA = [
  {name: 'Hà Nội', value: LOCATION_STATE.HA_NOI},
  {name: 'Đà Nẵng', value: LOCATION_STATE.DA_NANG},
  {name: 'Hồ Chí Minh', value: LOCATION_STATE.HO_CHI_MINH},
  {name: 'Japan', value: LOCATION_STATE.JAPAN},
  {name: 'Singapore', value: LOCATION_STATE.SINGAPORE},
]

export type SALARY_RENDER_TYPE = {
    name: string,
    typeComponent: 'textField' | 'autoComplete',
    accept: (string | undefined)[],
    label?: string,
    xs: number,
    inputLabel?: string,
    options?: {value: string, name: string}[],
    type?: string,
    style?: CSSProperties,
    thousandSeparator?: boolean,
}

export const SALARY_RENDER: SALARY_RENDER_TYPE[] = [
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [SALARY_STATE.RANGE],
    label: t('from') as string,
    type: 'number',
    xs: 1,
    thousandSeparator: true,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.RANGE],
    label: t('to') as string,
    type: 'number',
    xs: 1,
    thousandSeparator: true,
  },
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [SALARY_STATE.MINIMUM],
    type: 'number',
    xs: 2,
    thousandSeparator: true,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.UP_TO],
    type: 'number',
    xs: 2,
    thousandSeparator: true,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.NEGOTITATION],
    type: 'number',
    xs: 4,
    style: {visibility: 'hidden'},
    thousandSeparator: true,
  },
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [undefined],
    type: 'number',
    xs: 4,
    style: {visibility: 'hidden'},
    thousandSeparator: true,
  },
  {
    name: 'currency',
    typeComponent: 'autoComplete',
    accept: [SALARY_STATE.RANGE, SALARY_STATE.MINIMUM, SALARY_STATE.UP_TO],
    inputLabel: t('unit') as string,
    options: CURRENCY_DATA,
    label: 'name',
    xs: 2,
  },
]

export const ENABLED_CHANGE_STATUS = {
  [STATUS_CANDIDATE.APPLIED]: [STATUS_CANDIDATE.INTERVIEWING, STATUS_CANDIDATE.OFFERING, STATUS_CANDIDATE.HIRED, STATUS_CANDIDATE.KIV, STATUS_CANDIDATE.OFFERED_LOST],
  [STATUS_CANDIDATE.INTERVIEWING]: [STATUS_CANDIDATE.OFFERING, STATUS_CANDIDATE.HIRED, STATUS_CANDIDATE.KIV, STATUS_CANDIDATE.OFFERED_LOST],
  [STATUS_CANDIDATE.OFFERING]: [STATUS_CANDIDATE.HIRED, STATUS_CANDIDATE.OFFERED_LOST],
  [STATUS_CANDIDATE.HIRED]: [STATUS_CANDIDATE.EX_STAFTT],
  [STATUS_CANDIDATE.KIV]: [],
  [STATUS_CANDIDATE.OFFERED_LOST]: [],
  [STATUS_CANDIDATE.EX_STAFTT]: [],
}

export const OPENING_PAGE_JOB = {
  list_job: 'list_job',
  candidate_job: 'candidate_job',
}