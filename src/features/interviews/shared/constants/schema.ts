import { isBefore, isValid } from 'date-fns'
import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

export const schema = yup.object({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('Interview title'))
    .max(64, RULE_MESSAGES.MC4('Interview title', 64)),
  candidate_job_id: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate_job_id')),
  interviewer: yup
    .array()
    .required(RULE_MESSAGES.MC1('interviewer'))
    .min(1, RULE_MESSAGES.MC1('interviewer')),
  interview_date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('interview date'))
    .nullable()
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates')
    .test('is_null', function () {
      const interview_date = this.parent?.interview_date
      if (!interview_date) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('interview date'),
        })
      }
      return true
    }),
  start_from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('start from'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test('validator-time-from', function () {
      const start_form = this.parent?.start_from
      const end_at = this.parent?.end_at
      const isValidate = isValid(new Date(end_at))
      if (!isValidate) return true

      const isDate1AfterDate2 = isBefore(new Date(start_form), new Date(end_at))
      if (!isDate1AfterDate2) {
        return this.createError({
          path: this.path,
          message: 'End time of the interview must be after the Start time',
        })
      }

      return true
    })
    .test('isPast', 'Start time cannot be past dates', function (value) {
      const { interview_date } = this.parent
      if (!isValid(interview_date) || !interview_date) return false

      let start_form = dayjs(value)

      if (interview_date) {
        const interview_date_current = dayjs(this.parent.interview_date)
        start_form = start_form
          .year(interview_date_current.year())
          .month(interview_date_current.month())
          .date(interview_date_current.date())
      }

      return dayjs().isBefore(start_form)
    }),
  end_at: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('end at'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test('validator-time', function (value) {
      const start_form = this.parent?.start_from
      const isValidate = isValid(new Date(start_form))
      if (!isValidate) return true

      const isDate1AfterDate2 = isBefore(new Date(start_form), new Date(value))
      if (!isDate1AfterDate2) {
        return this.createError({
          path: this.path,
          message: 'End time of the interview must be after the Start time',
        })
      }

      return true
    }),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  meeting_link: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('Interview title'))
    .max(64, RULE_MESSAGES.MC4('Interview title', 64)),
  candidate_job_id: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate_job_id')),
  interviewer: yup
    .array()
    .required(RULE_MESSAGES.MC1('interviewer'))
    .min(1, RULE_MESSAGES.MC1('interviewer')),
  interview_date: yup
    .date()
    .nullable()
    .typeError(RULE_MESSAGES.MC5('interview date'))
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates')
    .test('is_null', function () {
      const interview_date = this.parent?.interview_date
      if (!interview_date) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('interview date'),
        })
      }
      return true
    }),
  start_from: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('start from'))
    .required(RULE_MESSAGES.MC1('start from'))
    .test('validator-time-from', function () {
      const start_form = this.parent?.start_from
      const end_at = this.parent?.end_at
      const isValidate = isValid(new Date(end_at))
      if (!isValidate) return true

      const isDate1AfterDate2 = isBefore(new Date(start_form), new Date(end_at))
      if (!isDate1AfterDate2) {
        return this.createError({
          path: this.path,
          message: 'End time of the interview must be after the Start time',
        })
      }

      return true
    })
    .test('isPast', 'Start time cannot be past dates', function (value) {
      const { interview_date } = this.parent
      if (!isValid(interview_date) || !interview_date) return false

      let start_form = dayjs(value)

      if (interview_date) {
        const interview_date_current = dayjs(this.parent.interview_date)
        start_form = start_form
          .year(interview_date_current.year())
          .month(interview_date_current.month())
          .date(interview_date_current.date())
      }

      return dayjs().isBefore(start_form)
    }),
  end_at: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('end at'))
    .required(RULE_MESSAGES.MC1('end at'))
    .test('validator-time', function (value) {
      const start_form = this.parent?.start_from
      const isValidate = isValid(new Date(start_form))
      if (!isValidate) return true

      const isDate1AfterDate2 = isBefore(new Date(start_form), new Date(value))
      if (!isDate1AfterDate2) {
        return this.createError({
          path: this.path,
          message: 'End time of the interview must be after the Start time',
        })
      }

      return true
    }),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  meeting_link: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
