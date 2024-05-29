import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { isAfterDate } from 'shared/utils/date'
import * as yup from 'yup'

export const CreateInterviewSchema = yup.object().shape({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('interview title'))
    .max(64, RULE_MESSAGES.MC4('interview title', 64)),
  teamId: yup.string().required(RULE_MESSAGES.MC1('team')).default(''),
  jobId: yup.string().required(RULE_MESSAGES.MC1('job')).default(''),
  interviewer: yup.array().min(1, RULE_MESSAGES.MC1('interviewer')),
  candidateId: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(dayjs().startOf('day').toDate(), 'Date cannot be in the past')
    .required(RULE_MESSAGES.MC1('date')),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test(
      'is-before-to',
      RULE_MESSAGES.EW('end at', 'start from'),
      function (value) {
        const { to } = this.parent
        return dayjs(value).isBefore(dayjs(to))
      }
    )
    .test('isPast', 'Start from cannot be in the past', function () {
      if (isAfterDate(this.parent.from, this.parent.date)) return true
      return false
    }),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test(
      'is-before-to',
      RULE_MESSAGES.EW('end at', 'start from'),
      function (value) {
        const { from } = this.parent
        return dayjs(from).isBefore(dayjs(value))
      }
    )
    .test('isPast', 'End at cannot be in the past', function () {
      if (isAfterDate(this.parent.from, this.parent.date)) return true
      return false
    }),
  description: yup.string(),
})

export const EditInterviewSchema = yup.object().shape({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('interview title'))
    .max(64, RULE_MESSAGES.MC4('interview title', 64)),
  teamId: yup.string().required(RULE_MESSAGES.MC1('team')).default(''),
  jobId: yup.string().required(RULE_MESSAGES.MC1('job')).default(''),
  interviewer: yup.array().min(1, RULE_MESSAGES.MC1('interviewer')),
  candidateId: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  candidate_job_id: yup.string().default(''),
  date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(dayjs().startOf('day').toDate(), 'Date cannot be in the past')
    .required(RULE_MESSAGES.MC1('date')),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test(
      'is-before-to',
      RULE_MESSAGES.EW('end at', 'start from'),
      function (value) {
        const { to } = this.parent
        return dayjs(value).isBefore(dayjs(to))
      }
    )
    .test('isPast', 'Start from cannot be in the past', function () {
      if (isAfterDate(this.parent.from, this.parent.date)) return true
      return false
    }),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test(
      'is-before-to',
      RULE_MESSAGES.EW('end at', 'start from'),
      function (value) {
        const { from } = this.parent
        return dayjs(from).isBefore(dayjs(value))
      }
    )
    .test('isPast', 'End at cannot be in the past', function () {
      if (isAfterDate(this.parent.from, this.parent.date)) return true
      return false
    }),
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
