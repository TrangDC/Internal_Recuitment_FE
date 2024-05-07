import { CSSProperties } from 'react'
import { CURRENCY_STATE, LOCATION_STATE, SALARY_STATE, STATUS_STATE } from 'shared/constants/constants'

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
]

export const STATUS_DATA = [
  {name: 'DRAFT', value: STATUS_STATE.DRAFT},
  {name: 'OPENED', value: STATUS_STATE.OPENED},
  {name: 'CLOSED', value: STATUS_STATE.CLOSED},
]

export const STATUS_STYLE = {
  [STATUS_STATE.DRAFT]: {
    backgroundColor: '#eff3f5',
    color: 'black',
    text: 'Draft'
  },
  [STATUS_STATE.OPENED]: {
    backgroundColor: '#20A4A9',
    color: 'white',
    text: 'Opened'
  },
  [STATUS_STATE.CLOSED]: {
    backgroundColor: '#82868C',
    color: 'white',
    text: 'Closed'
  },
}

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
}

export const SALARY_RENDER: SALARY_RENDER_TYPE[] = [
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [SALARY_STATE.RANGE],
    label: 'From',
    type: 'number',
    xs: 1,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.RANGE],
    label: 'To',
    type: 'number',
    xs: 1,
  },
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [SALARY_STATE.MINIMUM],
    type: 'number',
    xs: 2,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.UP_TO],
    type: 'number',
    xs: 2,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_STATE.NEGOTITATION],
    type: 'number',
    xs: 4,
    style: {visibility: 'hidden'}
  },
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [undefined],
    type: 'number',
    xs: 4,
    style: {visibility: 'hidden'}
  },
  {
    name: 'currency',
    typeComponent: 'autoComplete',
    accept: [SALARY_STATE.RANGE, SALARY_STATE.MINIMUM, SALARY_STATE.UP_TO],
    inputLabel: 'Unit',
    options: CURRENCY_DATA,
    label: 'name',
    xs: 2,
  },
]
