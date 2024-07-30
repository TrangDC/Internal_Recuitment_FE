import { Box, styled } from '@mui/material'
import dayjs from 'dayjs'
import { TYPE_CANDIDATE_STATUS } from 'shared/class/candidate'
import ChipCandidate from 'shared/class/candidate/components/ChipCandidate'
import { TYPE_JOB_STATUS } from 'shared/class/job-status'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import {
  TYPE_PRIORITY_STATUS,
  getPriorityByStatus,
} from 'shared/class/priority'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import AntSwitch from 'shared/components/ant-switch'
import { EB_SOURCE_LABEL } from 'shared/components/autocomplete/EB-auto-complete'
import { REC_SOURCE_LABEL } from 'shared/components/autocomplete/REC-auto-complete'
import {
  CANDIDATE_SOURCE_LABEL,
  CANDIDATE_SOURCE_STATE,
} from 'shared/components/autocomplete/candidate-source-auto-complete'
import { EVENT_EMAIL } from 'shared/components/autocomplete/event-email-autocomplete'
import { failed_reason_data } from 'shared/components/autocomplete/failed-reason-auto-complete'
import { HIRING_PLATFORM_LABEL } from 'shared/components/autocomplete/hiring-platform-auto-complete'
import { SEND_TO_LABEL } from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import FlexBox from 'shared/components/flexbox/FlexBox'
import {
  CURRENCY_TEXT_LABEL,
  LOCATION_LABEL,
  SALARY_TYPE_TEXT,
} from 'shared/constants/constants'
import { LinkText } from 'shared/styles'
import {
  convertStringToArray,
  getLastString,
} from 'shared/utils/convert-string'

const DescriptionRender = styled(Box)(({ theme }) => ({
  img: {
    width: '100px',
    height: 'auto',
  },
}))

export function renderText(text: string) {
  return text
}

export function renderDescription(text: string) {
  return (
    <DescriptionRender
      dangerouslySetInnerHTML={{ __html: text }}
    ></DescriptionRender>
  )
}

export function renderCurrencyEN(text: string) {
  const locale = 'en-US'
  return Number(text).toLocaleString(locale)
}

type TYPE_CURRENCY = keyof typeof CURRENCY_TEXT_LABEL
export function renderCurrencyEnum(text: string) {
  const unit = getLastString(text)
  return CURRENCY_TEXT_LABEL[unit as TYPE_CURRENCY]
}

export function renderStatusHiringJob(text: string) {
  const status = getLastString(text)
  return <ChipJob status={status as TYPE_JOB_STATUS} />
}

export function renderStatusCandidateJob(text: string) {
  const status = getLastString(text)
  return <ChipCandidate status={status as TYPE_CANDIDATE_STATUS} />
}

export function renderPriority(text: string) {
  const status = getLastString(text)
  const value_status = getPriorityByStatus(status)

  return <ChipPriority status={value_status as TYPE_PRIORITY_STATUS} />
}

type TYPE_SALARY_TYPE = keyof typeof SALARY_TYPE_TEXT
export function renderSalaryByType(text: string) {
  const salary_type = getLastString(text)
  return SALARY_TYPE_TEXT[salary_type as TYPE_SALARY_TYPE]
}

type TYPE_LOCATION = keyof typeof LOCATION_LABEL
export function renderLocation(text: string) {
  const location_data = getLastString(text)
  return LOCATION_LABEL[location_data as TYPE_LOCATION]
}

type TYPE_EVENT_EMAIL = keyof typeof EVENT_EMAIL
export const renderEventEmailTemplate = (text: string) => {
  const event_data = getLastString(text)
  return EVENT_EMAIL[event_data as TYPE_EVENT_EMAIL]?.label
}

export const renderStatusEmail = (text: string) => {
  const status = getLastString(text)
  return <AntSwitch checked={status === 'active'} />
}

type TYPE_SEND_TO = keyof typeof SEND_TO_LABEL
export const renderSendTo = (text: string) => {
  const list_send_to = Array.from(text).map((send_to) => {
    const enum_send_to = send_to.includes('model.email_templates.send_to_enum');
   return enum_send_to ? SEND_TO_LABEL[getLastString(send_to) as TYPE_SEND_TO] : send_to;
  });

  return list_send_to.join(', ');
}

export function renderDate(date: string) {
  return date && dayjs(date).format('DD/MM/YYYY')
}

export function renderDateTime(text: string) {
  return dayjs(text).format('DD/MM/YYYY HH:mm')
}

export function renderListItem(text: string) {
  return Array.from(text).join(', ')
}

export function renderYesNo(text: string) {
  const boolean = getLastString(text)
  return boolean.charAt(0).toUpperCase() + boolean.slice(1)
}

export type TYPE_REFERENCE_TYPE = keyof typeof CANDIDATE_SOURCE_LABEL
export function renderReferenceType(text: string) {
  const reference_type = getLastString(text)

  return CANDIDATE_SOURCE_LABEL[reference_type as TYPE_REFERENCE_TYPE]
}

//reference_value
export type TYPE_REFERENCE_VALUE_EB = keyof typeof EB_SOURCE_LABEL
export function renderReferenceEB(text: TYPE_REFERENCE_VALUE_EB) {
  return EB_SOURCE_LABEL[text]
}

export type TYPE_REFERENCE_VALUE_REC = keyof typeof REC_SOURCE_LABEL
export function renderReferenceREC(text: TYPE_REFERENCE_VALUE_REC) {
  return REC_SOURCE_LABEL[text]
}

export type TYPE_REFERENCE_VALUE_HIRING_PLATFORM =
  keyof typeof HIRING_PLATFORM_LABEL
export function renderReferenceHiringPlatform(
  text: TYPE_REFERENCE_VALUE_HIRING_PLATFORM
) {
  return HIRING_PLATFORM_LABEL[text]
}

export function renderReferenceValue(text: string) {
  const reference_array = convertStringToArray(text)
  const reference_type = reference_array[3]
  const reference_value = reference_array[5]

  return renderReferenceValueByType(reference_type, reference_value)
}

export function renderReferenceValueByType(
  reference_type: string,
  reference_value: string
) {
  switch (reference_type) {
    case CANDIDATE_SOURCE_STATE.EB:
      return renderReferenceEB(reference_value as TYPE_REFERENCE_VALUE_EB)
    case CANDIDATE_SOURCE_STATE.REC:
      return renderReferenceREC(reference_value as TYPE_REFERENCE_VALUE_REC)
    case CANDIDATE_SOURCE_STATE.HIRING_PLATFORM:
      return renderReferenceHiringPlatform(
        reference_value as TYPE_REFERENCE_VALUE_HIRING_PLATFORM
      )
    case CANDIDATE_SOURCE_STATE.REFERENCE:
    case CANDIDATE_SOURCE_STATE.HEADHUNT:
    default:
      return reference_value
  }
}

export const renderAttachment = (text: string) => {
  const documents = Array.from(text)

  return (
    <FlexBox flexDirection={'column'} gap={'2px'}>
      {documents.map((item, idx) => {
        return <Box key={idx}>{item}</Box>
      })}
    </FlexBox>
  )
}

type TYPE_FAILED_REASON = keyof typeof failed_reason_data
export const renderFailedReason = (text: string) => {
  const failed_reasons = Array.from(text).map((item) => {
    return failed_reason_data[item as TYPE_FAILED_REASON]?.label
  })

  return failed_reasons.join(', ')
}

export const renderLink = (text: string) => {
  return (
    <LinkText to={text} target="_blank">
      {text}
    </LinkText>
  )
}
