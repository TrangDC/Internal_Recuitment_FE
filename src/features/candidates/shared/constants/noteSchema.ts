import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'
export const CreateNote = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).default(''),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
})

export const EditNote = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).default(''),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
})

export type FormDataSchemaEditNote = yup.InferType<typeof EditNote>
export type FormDataSchemaCreateNote = yup.InferType<typeof CreateNote>
