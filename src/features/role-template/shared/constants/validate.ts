import { RULE_MESSAGES } from 'shared/constants/validate'
import { PermissionFormData } from 'shared/hooks/permissions/interface'
import * as yup from 'yup'
export const CreateRoleTemplateSchema = yup.object().shape({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('Name'))
    .max(64, RULE_MESSAGES.MC4('name', 64)),
  description: yup.string().max(64, RULE_MESSAGES.MC4('description', 255)),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
})

export const EditRoleTemplateSchema = yup.object().shape({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('Name'))
    .max(64, RULE_MESSAGES.MC4('name', 64))
    .default(''),
  description: yup
    .string()
    .max(64, RULE_MESSAGES.MC4('description', 255))
    .default(''),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
})

export const DetailRoleTemplateSchema = yup.object().shape({
  name: yup.string().default(''),
  description: yup.string().default(''),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
})

export type CreateRoleTemplateForm = yup.InferType<
  typeof CreateRoleTemplateSchema
>

export type EditRoleTemplateForm = yup.InferType<typeof EditRoleTemplateSchema>

export type DetailRoleTemplateForm = yup.InferType<
  typeof DetailRoleTemplateSchema
>