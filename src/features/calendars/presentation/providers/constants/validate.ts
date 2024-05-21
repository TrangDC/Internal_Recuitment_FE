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

export type CreateInterviewFrom = yup.InferType<typeof CreateInterviewSchema>
