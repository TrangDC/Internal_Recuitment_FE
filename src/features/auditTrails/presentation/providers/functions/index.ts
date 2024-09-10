import { convertStringToArray } from 'shared/utils/convert-string'
import {
  renderText,
} from '../helper'
import { ReactNode } from 'react'
import { BaseRecord } from 'shared/interfaces'
import { renderFieldTeam } from './team'
import { renderFieldEmailTemplate, showFieldEmail } from './email'
import { renderFieldCandidateJobFeedback } from './candidate-job-feedback'
import { renderFieldCandidateInterview } from './candidate-job-interview'
import { renderFieldHiringJob } from './hiring-job'
import { renderFieldCandidateJob } from './candidate-job'
import { renderFieldHiringJobStep } from './hiring-job-steps'
import { renderFieldUsers } from './users'
import { renderFieldPermissions } from './permissions'

export type renderValueReturn = (text: string, records: BaseRecord) => any

type renderTextRecordReturn = {
  renderValue: renderValueReturn
  record_value: string | ReactNode
  show_value: boolean
}

const audit_trails_by_model = {
  hiring_jobs: renderFieldHiringJob,
  candidates: renderFieldCandidateInterview,
  candidate_jobs: renderFieldCandidateJob,
  candidate_job_feedbacks: renderFieldCandidateJobFeedback,
  candidate_interviews: renderFieldCandidateInterview,
  email_templates: renderFieldEmailTemplate,
  hiring_teams: renderFieldTeam,
  hiring_job_steps: renderFieldHiringJobStep,
  users: renderFieldUsers,
  permissions: renderFieldPermissions
}

const show_field_by_model = {
  email_templates: showFieldEmail,
}

type TYPE_AUDIT_MODEL = keyof typeof audit_trails_by_model;
type TYPE_SHOW_FIELD_BY_MODEL = keyof typeof show_field_by_model;

export const renderTextRecord = (
  field_string: string,
  recordString: string,
  records: BaseRecord
): renderTextRecordReturn => {
  const [path, model, field] = convertStringToArray(field_string)
  console.log("🚀 ~ model:", model, field, field_string)
  let renderValue: renderValueReturn = audit_trails_by_model?.[model as TYPE_AUDIT_MODEL]?.(field) ?? renderText
  const record_value = renderValue(recordString, records)
  const show_value = show_field_by_model?.[model as TYPE_SHOW_FIELD_BY_MODEL]?.(field) ?? true;

  return {
    renderValue,
    record_value,
    show_value,
  }
}
