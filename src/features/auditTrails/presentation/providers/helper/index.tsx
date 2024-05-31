import dayjs from 'dayjs'
import { STATUS_STYLE } from 'features/jobs/presentation/providers/constants'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { CURRENCY_TEXT_LABEL, LOCATION_LABEL, SALARY_TYPE_TEXT } from 'shared/constants/constants'
import { getLastString } from 'shared/utils/convert-string'

export function renderText(text: string) {
  return text
}

export function renderDescription(text: string) {
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>
}

export function renderCurrencyEN(text: string) {
  const locale = 'en-US'
  return Number(text).toLocaleString(locale)
}

type type_currency = keyof typeof CURRENCY_TEXT_LABEL
export function renderCurrencyEnum(text: string) {
  const unit = getLastString(text)
  return CURRENCY_TEXT_LABEL[unit as type_currency]
}

export function renderStatusHiringJob(text: string) {
  const status = getLastString(text)
  const status_data = STATUS_STYLE[status]

  return status_data ? (
    <ChipFieldStatus
      label={status_data.text}
      style={{
        backgroundColor: status_data.backgroundColor,
        color: status_data.color,
      }}
    />
  ) : (
    ''
  )
}

type type_salary_type = keyof typeof SALARY_TYPE_TEXT
export function renderSalaryByType(text: string) {
    const salary_type = getLastString(text);
    return SALARY_TYPE_TEXT[salary_type as type_salary_type]
}

type type_location = keyof typeof LOCATION_LABEL
export function renderLocation(text: string) {
    const location_data =  getLastString(text);
    return LOCATION_LABEL[location_data as type_location]
}

export function renderDate(text: string) {
    return dayjs(text).format('hh:mm, DD/MM/YYYY')
}

export function renderYesNo(text: string) {
    const boolean =  getLastString(text);
    return boolean.charAt(0).toUpperCase() + boolean.slice(1)
}

