import { isBefore, isValid } from 'date-fns'
import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'

export const schema = yup.object({
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('interview title'))
    .max(64, RULE_MESSAGES.MC4('Interview name', 64)),
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
    .required(RULE_MESSAGES.MC1('interview date'))
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates'),
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

      let start_form = dayjs(value)

      if (interview_date) {
        const interview_date_current = dayjs(this.parent.interview_date)
        start_form = start_form
          .year(interview_date_current.year())
          .month(interview_date_current.month())
          .date(interview_date_current.date())
      }

      return dayjs().isBefore(start_form.toDate())
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
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  title: yup
    .string()
    .required(RULE_MESSAGES.MC1('interview title'))
    .max(64, RULE_MESSAGES.MC4('Interview name', 64)),
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
    .required(RULE_MESSAGES.MC1('interview date'))
    .min(dayjs().startOf('day').toDate(), 'Cannot be past dates'),
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

      let start_form = dayjs(value)

      if (interview_date) {
        const interview_date_current = dayjs(this.parent.interview_date)
        start_form = start_form
          .year(interview_date_current.year())
          .month(interview_date_current.month())
          .date(interview_date_current.date())
      }

      return dayjs().isBefore(start_form.toDate())
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
  description: yup.string(),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  note: yup.string(),
})
export type FormDataSchemaDelete = yup.InferType<typeof schemaDelete>
