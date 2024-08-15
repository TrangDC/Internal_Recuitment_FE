import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/validate'
import User from 'shared/schema/database/user'
import { isPast } from 'shared/utils/date'
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
    .nullable()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates')
    .test('is_null', function () {
      const interview_date = this.parent?.date
      if (!interview_date) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('interview date'),
        })
      }
      return true
    }),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { to } = this.parent
        return dayjs(value).isBefore(dayjs(to))
      }
    )
    .test('isPast', 'Start from cannot be in the past', function () {
      if (isPast(this.parent.from)) return true
      return false
    }),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { from } = this.parent
        return dayjs(from).isBefore(dayjs(value))
      }
    )
    .test('isPast', 'End at cannot be in the past', function () {
      if (isPast(this.parent.to)) return true
      return false
    }),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  meeting_link: yup.string(),
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
    .nullable()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates')
    .test('is_null', function () {
      const interview_date = this.parent?.date
      if (!interview_date) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('interview date'),
        })
      }
      return true
    }),
  from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { to } = this.parent
        return dayjs(value).isBefore(dayjs(to))
      }
    )
    .test('isPast', 'Start from cannot be in the past', function () {
      if (isPast(this.parent.from)) return true
      return false
    }),
  to: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { from } = this.parent
        return dayjs(from).isBefore(dayjs(value))
      }
    )
    .test('isPast', 'End at cannot be in the past', function () {
      if (isPast(this.parent.to)) return true
      return false
    }),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  meeting_link: yup.string(),
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
  candidateName: yup.string().default(''),
  candidateEmail: yup.string().default(''),
  phone: yup.string().default(''),
  team: yup.string().default(''),
  job: yup.string().default(''),
  hiring_job_id: yup.string().default(''),
  candidate_id: yup.string().default(''),
  candidateJobOfTeamId: yup.string().default(''),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  meeting_link: yup.string(),
  interviewer: yup.array<any, User>().default([]),
  status: yup
    .string()
    .oneOf(['invited_to_interview', 'interviewing', 'done', 'cancelled'])
    .default('invited_to_interview'),
})

export type CreateInterviewFrom = yup.InferType<typeof CreateInterviewSchema>
export type GetInterviewFrom = yup.InferType<typeof getOneInterviewSchema>
export type EditInterviewFrom = yup.InferType<typeof EditInterviewSchema>
