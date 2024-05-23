import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
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
  date: yup.date().required(RULE_MESSAGES.MC1('date')),
  from: yup.date().required(RULE_MESSAGES.MC1('from')),
  to: yup
    .date()
    .required(RULE_MESSAGES.MC1('to'))
    .test('is-before-to', RULE_MESSAGES.EW('to', 'from'), function (value) {
      const { from } = this.parent
      return dayjs(from).isBefore(dayjs(value))
    }),
  description: yup
    .string()
    .max(256, RULE_MESSAGES.MC4('Meta description', 256)),
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
  date: yup.date().required(RULE_MESSAGES.MC1('date')),
  from: yup.date().required(RULE_MESSAGES.MC1('from')),
  candidate_job_id: yup.string().default(''),
  to: yup
    .date()
    .required(RULE_MESSAGES.MC1('to'))
    .test('is-before-to', RULE_MESSAGES.EW('to', 'from'), function (value) {
      const { from } = this.parent
      return dayjs(from).isBefore(dayjs(value))
    }),
  description: yup
    .string()
    .max(256, RULE_MESSAGES.MC4('Meta description', 256)),
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
})

export type CreateInterviewFrom = yup.InferType<typeof CreateInterviewSchema>
export type GetInterviewFrom = yup.InferType<typeof getOneInterviewSchema>
export type EditInterviewFrom = yup.InferType<typeof EditInterviewSchema>
