import { PermissionFormData } from 'shared/components/role-template-permission/interfaces/permissionStructure'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required().max(255, RULE_MESSAGES.MC4('name', 255)),
  team: yup.object().required(),
  email: yup.string().email().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255)),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  hiring_team_id: yup
    .string()
    .test('isRequired', RULE_MESSAGES.MC1('hiring team'), function () {
      if (
        (!this.parent.rec_team_id && this.parent.hiring_team_id) ||
        (this.parent.rec_team_id && this.parent.hiring_team_id) ||
        (this.parent.rec_team_id && !this.parent.hiring_team_id)
      ) {
        return true
      }
      return false
    }),
  rec_team_id: yup
    .string()
    .test('isRequired', RULE_MESSAGES.MC1('rec team'), function () {
      if (
        (!this.parent.hiring_team_id && this.parent.rec_team_id) ||
        (this.parent.hiring_team_id && this.parent.rec_team_id) ||
        (this.parent.hiring_team_id && !this.parent.rec_team_id)
      )
        return true
      return false
    }),
  work_email: yup
    .string()
    .email(RULE_MESSAGES.MC5('work email'))
    .required(RULE_MESSAGES.MC1('work email')),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
  rolesTemplateId: yup
    .array<any, string>()
    .required(RULE_MESSAGES.MC1('Role'))
    .min(1, RULE_MESSAGES.MC1('Role'))
    .default([]),
  is_leader_of_rec_team: yup.boolean().default(false),
  is_manager_of_hiring_team: yup.boolean().default(false),
})

export const schemaHiringDetail = yup.object({
  name: yup.string().default(''),
  status: yup.string().default(''),
  recTeamName: yup.string().default(''),
  hiringTeamName: yup.string().default(''),
  work_email: yup.string().default(''),
  entity_permissions: yup.mixed<PermissionFormData>().default({}),
  rolesTemplateName: yup.array<any, string>().default([]),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
export type FormDataSchemaDetail = yup.InferType<typeof schemaHiringDetail>
