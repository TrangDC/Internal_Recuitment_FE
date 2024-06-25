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
import { EB_SOURCE_LABEL } from 'shared/components/autocomplete/EB-auto-complete'
import { REC_SOURCE_LABEL } from 'shared/components/autocomplete/REC-auto-complete'
import {
  CANDIDATE_SOURCE_LABEL,
  CANDIDATE_SOURCE_STATE,
} from 'shared/components/autocomplete/candidate-source-auto-complete'
import { HIRING_PLATFORM_LABEL } from 'shared/components/autocomplete/hiring-platform-auto-complete'
import FlexBox from 'shared/components/flexbox/FlexBox'
import {
  CURRENCY_TEXT_LABEL,
  LOCATION_LABEL,
  SALARY_TYPE_TEXT,
} from 'shared/constants/constants'
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

type type_currency = keyof typeof CURRENCY_TEXT_LABEL
export function renderCurrencyEnum(text: string) {
  const unit = getLastString(text)
  return CURRENCY_TEXT_LABEL[unit as type_currency]
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

type type_salary_type = keyof typeof SALARY_TYPE_TEXT
export function renderSalaryByType(text: string) {
  const salary_type = getLastString(text)
  return SALARY_TYPE_TEXT[salary_type as type_salary_type]
}

type type_location = keyof typeof LOCATION_LABEL
export function renderLocation(text: string) {
  const location_data = getLastString(text)
  return LOCATION_LABEL[location_data as type_location]
}

export function renderDate(text: string) {
  return dayjs(text).format('DD/MM/YYYY')
}

export function renderDateTime(text: string) {
  return dayjs(text).format('DD/MM/YYYY HH:mm')
}

export function renderYesNo(text: string) {
  const boolean = getLastString(text)
  return boolean.charAt(0).toUpperCase() + boolean.slice(1)
}

type type_reference_type = keyof typeof CANDIDATE_SOURCE_LABEL
export function renderReferenceType(text: string) {
  const reference_type = getLastString(text)

  return CANDIDATE_SOURCE_LABEL[reference_type as type_reference_type]
}

//reference_value
type type_reference_value_EB = keyof typeof EB_SOURCE_LABEL
export function renderReferenceEB(text: type_reference_value_EB) {
  return EB_SOURCE_LABEL[text]
}

type type_reference_value_REC = keyof typeof REC_SOURCE_LABEL
export function renderReferenceREC(text: type_reference_value_REC) {
  return REC_SOURCE_LABEL[text]
}

type type_reference_value_Hiring_platform = keyof typeof HIRING_PLATFORM_LABEL
export function renderReferenceHiringPlatform(
  text: type_reference_value_Hiring_platform
) {
  return HIRING_PLATFORM_LABEL[text]
}

export function renderReferenceValue(text: string) {
  const reference_array = convertStringToArray(text)
  const reference_type = reference_array[3]
  const reference_value = reference_array[5]

  switch (reference_type) {
    case CANDIDATE_SOURCE_STATE.EB:
      return renderReferenceEB(reference_value as type_reference_value_EB)
    case CANDIDATE_SOURCE_STATE.REC:
      return renderReferenceREC(reference_value as type_reference_value_REC)
    case CANDIDATE_SOURCE_STATE.HIRING_PLATFORM:
      return renderReferenceHiringPlatform(
        reference_value as type_reference_value_Hiring_platform
      )
    case CANDIDATE_SOURCE_STATE.REFERENCE:
    case CANDIDATE_SOURCE_STATE.HEADHUNT:
    default:
      return text
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
