import { get } from 'lodash'
import { CSSProperties } from 'react'
import { CURRENCY_DATA, SALARY_DATA } from 'shared/constants/constants'

export type SALARY_RENDER_TYPE = {
    name: string,
    typeComponent: 'textField' | 'autoComplete',
    accept: (string | undefined)[],
    label?: string,
    xs: number,
    inputLabel?: string,
    options?: {id: number, name: string}[],
    type?: string,
    style?: CSSProperties,
}

export const SALARY_RENDER: SALARY_RENDER_TYPE[] = [
  {
    name: 'salary_from',
    typeComponent: 'textField',
    accept: [SALARY_DATA.RANGE, undefined],
    label: 'From',
    type: 'number',
    xs: 2,
  },
  {
    name: 'salary_to',
    typeComponent: 'textField',
    accept: [SALARY_DATA.RANGE, undefined],
    label: 'From',
    type: 'number',
    xs: 2,
  },
  {
    name: 'money_minimum',
    typeComponent: 'textField',
    accept: [SALARY_DATA.MINIMUM],
    type: 'number',
    xs: 4,
  },
  {
    name: 'money_upto',
    typeComponent: 'textField',
    accept: [SALARY_DATA.UP_TO],
    type: 'number',
    xs: 4,
  },
  {
    name: 'money_upto',
    typeComponent: 'textField',
    accept: [SALARY_DATA.NEGOTITATION],
    type: 'number',
    xs: 5,
    style: {visibility: 'hidden'}
  },
  {
    name: 'currency',
    typeComponent: 'autoComplete',
    accept: [SALARY_DATA.RANGE, SALARY_DATA.MINIMUM, SALARY_DATA.UP_TO, undefined],
    inputLabel: 'Unit',
    options: [
      ...Object.keys(CURRENCY_DATA).map((salary, index) => ({
        id: index,
        name: get(CURRENCY_DATA, salary),
      })),
    ],
    label: 'name',
    xs: 1,
  },
]
