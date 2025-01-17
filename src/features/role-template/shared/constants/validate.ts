import { PermissionFormData } from 'shared/components/role-template-permission/interfaces/permissionStructure'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'
export const CreateRoleTemplateSchema = yup.object().shape({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('role name'))
    .max(255, RULE_MESSAGES.MC4('role name', 255)),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
})

export const EditRoleTemplateSchema = yup.object().shape({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('role name'))
    .max(255, RULE_MESSAGES.MC4('role name', 255))
    .default(''),
  description: yup
    .string()
    .max(512, RULE_MESSAGES.MC4('description', 512))
    .default(''),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
})

export const DetailRoleTemplateSchema = yup.object().shape({
  name: yup.string().default(''),
  description: yup.string().default(''),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
  is_able_to_delete: yup.boolean().default(true),
})
export type CreateRoleTemplateForm = yup.InferType<
  typeof CreateRoleTemplateSchema
>

export type EditRoleTemplateForm = yup.InferType<typeof EditRoleTemplateSchema>

export type DetailRoleTemplateForm = yup.InferType<
  typeof DetailRoleTemplateSchema
>
