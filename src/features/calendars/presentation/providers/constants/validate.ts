import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { isPast } from 'shared/utils/date'
import * as yup from 'yup'

export const CreateInterviewSchema = yup.object().shape({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('title'))
    .max(255, RULE_MESSAGES.MC4('title', 255)),
  teamId: yup.string().required(RULE_MESSAGES.MC1('team')).default(''),
  jobId: yup.string().required(RULE_MESSAGES.MC1('job')).default(''),
  interviewer: yup.array().min(1, RULE_MESSAGES.MC1('interviewer')),
  candidateId: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(
      dayjs().startOf('day').toDate(),
      RULE_MESSAGES.MC1('date cannot be in the past')
    )
    .required(RULE_MESSAGES.MC1('date')),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('from'))
    .test('isPast', 'date cannot be in the past', function () {
      if (isPast(this.parent.from)) return true
      return false
    }),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('to'))
    .test('is-before-to', RULE_MESSAGES.EW('to', 'from'), function (value) {
      const { from } = this.parent
      console.log('value', value)
      return dayjs(from).isBefore(dayjs(value))
    })
    .test('isPast', 'date cannot be in the past', function () {
      if (isPast(this.parent.to)) return true
      return false
    }),
  description: yup.string(),
})

export const EditInterviewSchema = yup.object().shape({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('title'))
    .max(255, RULE_MESSAGES.MC4('title', 255)),
  teamId: yup.string().required(RULE_MESSAGES.MC1('team')).default(''),
  jobId: yup.string().required(RULE_MESSAGES.MC1('job')).default(''),
  interviewer: yup.array().min(1, RULE_MESSAGES.MC1('interviewer')),
  candidateId: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(
      dayjs().startOf('day').toDate(),
      RULE_MESSAGES.MC1('date cannot be in the past')
    )
    .required(RULE_MESSAGES.MC1('date')),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(
      dayjs().startOf('day').toDate(),
      RULE_MESSAGES.MC1('date cannot be in the past')
    )
    .required(RULE_MESSAGES.MC1('from'))
    .nullable(),
  candidate_job_id: yup.string().default(''),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('to'))
    .min(
      dayjs().startOf('day').toDate(),
      RULE_MESSAGES.MC1('date cannot be in the past')
    )
    .test('is-before-to', RULE_MESSAGES.EW('to', 'from'), function (value) {
      const { from } = this.parent
      return dayjs(from).isBefore(dayjs(value))
    })
    .nullable(),
  description: yup.string(),
})

export const InterviewerSchema = yup.object().shape({
  id: yup.string().default(''),
  name: yup.string().default(''),
})

export const getOneInterviewSchema = yup.object().shape({
  id: yup.string().default(''),
  title: yup.string().default(''),
  description: yup.string().default(''),
  interview_date: yup.date(),
  start_from: yup.date(),
  end_at: yup.date(),
  interviewer: yup.array().of(InterviewerSchema).default([]),
  candidateName: yup.string().default(''),
  candidateEmail: yup.string().default(''),
  phone: yup.string().default(''),
  team: yup.string().default(''),
  job: yup.string().default(''),
  hiring_job_id: yup.string().default(''),
  candidate_id: yup.string().default(''),
})

export type CreateInterviewFrom = yup.InferType<typeof CreateInterviewSchema>
export type GetInterviewFrom = yup.InferType<typeof getOneInterviewSchema>
export type EditInterviewFrom = yup.InferType<typeof EditInterviewSchema>