import { renderValueReturn } from '.'
import { renderStatusHiringJobStep, renderText } from '../helper'

enum Field {
  STATUS = 'status',
}

const audit_trails_hiring_job_steps: Record<Field, renderValueReturn> = {
  [Field.STATUS]: renderStatusHiringJobStep,
}
export function renderFieldHiringJobStep(field: string): renderValueReturn {
  return audit_trails_hiring_job_steps[field as Field] ?? renderText
}
