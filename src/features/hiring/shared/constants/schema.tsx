import { RULE_MESSAGES } from 'shared/constants/validate'
import { PermissionFormData } from 'shared/hooks/permissions/interface'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  team: yup.object().required(),
  email: yup.string().email().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  teamId: yup.string().required(RULE_MESSAGES.MC1('team')),
  work_email: yup
    .string()
    .email(RULE_MESSAGES.MC5('work email'))
    .required(RULE_MESSAGES.MC1('work email')),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
  rolesTemplateId: yup.array<any, string>().default([]),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  note: yup.string(),
})
export type FormDataSchemaUpdateStatus = yup.InferType<
  typeof schemaChangeStatus
>
