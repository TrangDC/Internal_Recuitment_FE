import { isBefore, isValid } from 'date-fns'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required(RULE_MESSAGES.MC1('interview title')).max(64, RULE_MESSAGES.MC4('Interview name', 64)),
  candidate_job_id: yup.string().required(RULE_MESSAGES.MC1('candidate_job_id')),
  interviewer: yup.array().required(RULE_MESSAGES.MC1('interview interviewer')).min(1),
  interview_date: yup.date().typeError(RULE_MESSAGES.MC5("interview date")).required(RULE_MESSAGES.MC1('interview date')),
  start_from: yup.date().required(RULE_MESSAGES.MC1('start from')),
  end_at: yup
    .date()
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
  title: yup.string().required(RULE_MESSAGES.MC1('interview title')).max(64, RULE_MESSAGES.MC4('Interview name', 64)),
  candidate_job_id: yup.string().required(RULE_MESSAGES.MC1('candidate_job_id')),
  interviewer: yup.array().required(RULE_MESSAGES.MC1('interview interviewer')).min(1),
  interview_date: yup.date().typeError(RULE_MESSAGES.MC5("interview date")).required(RULE_MESSAGES.MC1('interview date')),
  start_from: yup.date().required(RULE_MESSAGES.MC1('start from')),
  end_at: yup
    .date()
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

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  note: yup.string(),
});
export type FormDataSchemaDelete = yup.InferType<typeof schemaDelete>
