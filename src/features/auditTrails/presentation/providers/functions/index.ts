import { convertStringToArray } from 'shared/utils/convert-string'
import {
  renderAttachment,
  renderCurrencyEN,
  renderCurrencyEnum,
  renderDate,
  renderDateTime,
  renderDescription,
  renderFailedReason,
  renderLink,
  renderListItem,
  renderLocation,
  renderPriority,
  renderReferenceType,
  renderReferenceValue,
  renderSalaryByType,
  renderStatusCandidateJob,
  renderStatusHiringJob,
  renderText,
  renderYesNo,
} from '../helper'
import { ReactNode } from 'react'
import { BaseRecord } from 'shared/interfaces'

type renderValueReturn = (text: string, records: BaseRecord) => any

type renderTextRecordReturn = {
  renderValue: renderValueReturn
  record_value: string | ReactNode
}

export const renderTextRecord = (
  field_string: string,
  recordString: string,
  records: BaseRecord
): renderTextRecordReturn => {
  const [path, model, field] = convertStringToArray(field_string)
  let renderValue: renderValueReturn

  switch (model) {
    case 'hiring_jobs':
      renderValue = renderFieldHiringJob(field)
      break
    case 'candidates':
      renderValue = renderFieldCandidate(field)
      break
    case 'candidate_jobs':
      renderValue = renderFieldCandidateJob(field)
      break
    case 'candidate_job_feedbacks':
      renderValue = renderFieldCandidateJobFeedback(field)
      break
    case 'candidate_interviews':
      renderValue = renderFieldCandidateInterview(field)
      break
    default:
      renderValue = renderText
      break
  }

  const record_value = renderValue(recordString, records)

  return {
    renderValue,
    record_value,
  }
}

function renderFieldCandidateJobFeedback(field: string): renderValueReturn {
  let renderValue

  switch (field) {
    case 'description':
      renderValue = renderDescription
      break
    case 'document':
      renderValue = renderAttachment
      break
    default: {
      renderValue = renderText
    }
  }

  return renderValue
}

function renderFieldCandidateInterview(field: string): renderValueReturn {
  let renderValue

  switch (field) {
    case 'interview_date':
      renderValue = renderDate
      break
    case 'start_from':
      renderValue = renderDateTime
      break
    case 'end_at':
      renderValue = renderDateTime
      break
    case 'members':
      renderValue = renderListItem
    break;
    case 'meeting_link':
      renderValue = renderLink
    break;
    default: {
      renderValue = renderText
    }
  }

  return renderValue
}

function renderFieldHiringJob(field: string): renderValueReturn {
  let renderValue

  switch (field) {
    case 'description':
      renderValue = renderDescription
      break
    case 'salary_from':
    case 'salary_to':
      renderValue = renderCurrencyEN
      break
    case 'currency':
      renderValue = renderCurrencyEnum
      break
    case 'status':
      renderValue = renderStatusHiringJob
      break
    case 'priority':
      renderValue = renderPriority
      break
    case 'salary_type':
      renderValue = renderSalaryByType
      break
    case 'location':
      renderValue = renderLocation
      break
    case 'skills':
      renderValue = renderListItem
    break;
    default: {
      renderValue = renderText
    }
  }

  return renderValue
}

function renderFieldCandidateJob(field: string): renderValueReturn {
  let renderValue

  switch (field) {
    case 'status':
      renderValue = renderStatusCandidateJob
      break
    case 'document':
      renderValue = renderAttachment
      break
    case 'onboard_date':
      renderValue = renderDate
    break;
    case 'offer_expiration_date':
      renderValue = renderDate
    break;
    case 'failed_reason':
      renderValue = renderFailedReason
    break;
    default: {
      renderValue = renderText
    }
  }

  return renderValue
}

function renderFieldCandidate(field: string): renderValueReturn {
  let renderValue

  switch (field) {
    case 'dob':
    case 'recruit_time':
      renderValue = renderDate
      break
    case 'is_blacklist':
      renderValue = renderYesNo
      break
    case 'reference_type':
      renderValue = renderReferenceType
      break
    case 'reference_value':
      renderValue = renderReferenceValue
      break
    case 'description':
      renderValue = renderDescription
      break
    case 'document':
      renderValue = renderAttachment
      break
    default: {
      renderValue = renderText
    }
  }

  return renderValue
}
