import { isBefore, isValid } from 'date-fns';
import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required().max(64),
  candidate_job_id: yup.string().required(),
  interviewer: yup.array().required().min(1),
  interview_date: yup.date().required(),
  start_from: yup.date().required(),
  end_at: yup.date().required().test('validator-time', function (value) {
    const start_form = this.parent?.start_from;
    const isValidate = isValid(new Date(start_form));
    if (!isValidate) return true;

    const isDate1AfterDate2 = isBefore(new Date(start_form), new Date(value));
    if (!isDate1AfterDate2) {
      return this.createError({
        path: this.path,
        message: 'End At lon hon Start From',
      });
    }

    return true;
  }),
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>
