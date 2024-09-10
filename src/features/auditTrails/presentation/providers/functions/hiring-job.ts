import { renderValueReturn } from '.'
import { renderCurrencyEN, renderCurrencyEnum, renderDescription, renderLevel, renderListItem, renderLocation, renderPriority, renderSalaryByType, renderStatusHiringJob, renderText } from '../helper'

enum Field {
  DESCRIPTION = 'description',
  SALARY_FORM = 'salary_from',
  SALARY_TO = 'salary_to',
  CURRENCY = 'currency',
  STATUS = 'status',
  PRIORITY = 'priority',
  SALARY_TYPE = 'salary_type',
  LOCATION = 'location',
  SKILLS = 'skills',
  LEVEL = 'level'
}

const audit_trails_hiring_job: Record<Field, renderValueReturn> = {
  [Field.DESCRIPTION]: renderDescription,
  [Field.SALARY_FORM]: renderCurrencyEN,
  [Field.SALARY_TO]: renderCurrencyEN,
  [Field.CURRENCY]: renderCurrencyEnum,
  [Field.STATUS]: renderStatusHiringJob,
  [Field.PRIORITY]: renderPriority,
  [Field.SALARY_TYPE]: renderSalaryByType,
  [Field.LOCATION]: renderLocation,
  [Field.SKILLS]: renderListItem,
  [Field.LEVEL]: renderLevel
}
export function renderFieldHiringJob(field: string): renderValueReturn {
  return audit_trails_hiring_job[field as Field] ?? renderText
}
