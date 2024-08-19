import dayjs, { Dayjs } from 'dayjs'
import {
  FileUploadAttachment,
  UploadStatus,
} from 'shared/components/form/uploadFileBox/types'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

const candidateExp = yup.object({
  id: yup.string(),
  position: yup.string().required(RULE_MESSAGES.MC1('position')).default(''),
  company: yup.string().required(RULE_MESSAGES.MC1('company')).default(''),
  location: yup.string().default(''),
  start_date: yup
    .mixed<Dayjs>()
    .nullable()
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { end_date } = this.parent
        if (!end_date) return true
        return dayjs(value).isBefore(dayjs(end_date))
      }
    ),
  end_date: yup
    .mixed<Dayjs>()
    .nullable()
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { start_date } = this.parent
        if (!start_date) return true
        return dayjs(start_date).isBefore(dayjs(value))
      }
    ),
  description: yup.string().default(''),
  is_current: yup.bool().default(false),
})

const attachmentInput = yup.object({
  id: yup.string().default(''),
  document_name: yup.string().default(''),
  document_id: yup.string().required(),
  status: yup.string<UploadStatus>().default('old'),
  file: yup.mixed<File>().nullable().default(null),
  url: yup.string().default(''),
})

const candidateEducate = yup.object({
  id: yup.string(),
  school_name: yup.string().required(RULE_MESSAGES.MC1('school name')),
  major: yup.string(),
  gpa: yup.string(),
  start_date: yup
    .mixed<Dayjs>()
    .nullable()
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { end_date } = this.parent
        if (!end_date || !value) return true
        return dayjs(value).isBefore(dayjs(end_date))
      }
    ),
  end_date: yup
    .mixed<Dayjs>()
    .nullable()
    .test(
      'is-before-to',
      'End time of the interview must be after the Start time',
      function (value) {
        const { start_date } = this.parent
        if (!start_date || !value) return true
        return dayjs(start_date).isBefore(dayjs(value))
      }
    ),
  location: yup.string(),
  description: yup.string(),
  attachments: yup.array().of(attachmentInput),
  is_current: yup.bool().default(false),
})

const award = yup.object({
  id: yup.string(),
  name: yup.string().required(RULE_MESSAGES.MC1('name')),
  achieved_date: yup.mixed<Dayjs>().nullable(),
  attachments: yup.array().of(attachmentInput),
})

const certificate = yup.object({
  id: yup.string(),
  name: yup.string().required(RULE_MESSAGES.MC1('name')),
  score: yup.string(),
  achieved_date: yup.mixed<Dayjs>().nullable(),
  attachments: yup.array().of(attachmentInput),
})

// const skill = yup.object({
//   id: yup.string(),
//   skill_id: yup.string().required(),
// })

const entitySkill = yup.object({
  id: yup.string(),
  skill_id: yup
    .array<any, string>()
    .min(1, RULE_MESSAGES.MC1('skill'))
    .required(RULE_MESSAGES.MC1('skill')),
  skill_type_id: yup.string().required(RULE_MESSAGES.MC1('skill type')),
})

export const CreateCandidate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255))
    .default(''),
  gender: yup.string().required(RULE_MESSAGES.MC1('gender')).default(''),
  phone: yup
    .string()
    .required(RULE_MESSAGES.MC1('phone'))
    // .matches(/^\+?\d+$/, RULE_MESSAGES.MC5('phone'))
    // .min(8, RULE_MESSAGES.MC2('phone', 8, 15))
    // .max(15, RULE_MESSAGES.MC2('phone', 8, 15))
    .default(''),
  email: yup
    .string()
    .email(RULE_MESSAGES.MC5('email'))
    .required(RULE_MESSAGES.MC1('email'))
    .max(64, RULE_MESSAGES.MC4('email', 64))
    .default(''),
  address: yup.string().default(''),
  dob: yup.mixed<Dayjs>().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  country: yup.string(),
  reference_type: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate source'))
    .default(''),
  reference_value: yup
    .string()
    .when(['reference_type'], ([reference_type], schema) => {
      return schema.required(
        RULE_MESSAGES.MC1(renderLabelReference(reference_type))
      )
    })
    .default(''),
  reference_uid: yup
    .string()
    .required(RULE_MESSAGES.MC1('recruiter'))
    .default(''),
  recruit_time: yup
    .mixed<Dayjs>()
    .typeError(RULE_MESSAGES.MC5('recruit time'))
    .required(RULE_MESSAGES.MC1('recruit time')),
  description: yup
    .string()
    .max(512, RULE_MESSAGES.MC4('description', 512))
    .default(''),
  attachments: yup
    .array()
    .of(attachmentInput)
    .required(RULE_MESSAGES.MC1('attach CV'))
    .min(1, RULE_MESSAGES.MC1('attach CV'))
    .default([]),
  candidate_exp: yup.array().of(candidateExp).default([]),
  candidate_educate: yup.array().of(candidateEducate).default([]),
  candidate_award: yup.array().of(award).default([]),
  candidate_certificate: yup.array().of(certificate).default([]),
  avatar: yup.string().default(''),
  entity_skill_records: yup
    .array()
    .of(
      entitySkill.test(
        'unique-skill-type',
        'Skill type must be unique',
        function (value, context) {
          const { parent } = context
          const skillTypeIds = parent.map((item: any) => item.skill_type_id)
          const duplicates = skillTypeIds.filter(
            (id: string, index: number) => skillTypeIds.indexOf(id) !== index
          )
          if (duplicates.includes(value.skill_type_id)) {
            return this.createError({
              path: `${this.path}.skill_type_id`,
              message: `Skill type has already existed`,
            })
          }

          return true
        }
      )
    )
    .default([]),
})

export const EditCandidate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255))
    .default(''),
  gender: yup.string().required(RULE_MESSAGES.MC1('gender')).default(''),
  phone: yup
    .string()
    .required(RULE_MESSAGES.MC1('phone'))
    // .matches(/^\+?\d+$/, RULE_MESSAGES.MC5('phone'))
    // .min(8, RULE_MESSAGES.MC2('phone', 8, 15))
    // .max(15, RULE_MESSAGES.MC2('phone', 8, 15))
    .default(''),
  email: yup
    .string()
    .email(RULE_MESSAGES.MC5('email'))
    .required(RULE_MESSAGES.MC1('email'))
    .max(64, RULE_MESSAGES.MC4('email', 64))
    .default(''),
  address: yup.string().default(''),
  dob: yup.mixed<Dayjs>().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  country: yup.string().default(''),
  reference_type: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate source'))
    .default(''),
  reference_value: yup
    .string()
    .when(['reference_type'], ([reference_type], schema) => {
      return schema.required(
        RULE_MESSAGES.MC1(renderLabelReference(reference_type))
      )
    })
    .default(''),
  reference_uid: yup
    .string()
    .required(RULE_MESSAGES.MC1('recruiter'))
    .default(''),
  recruit_time: yup
    .mixed<Dayjs>()
    .typeError(RULE_MESSAGES.MC5('recruit time'))
    .required(RULE_MESSAGES.MC1('recruit time')),
  description: yup
    .string()
    .max(512, RULE_MESSAGES.MC4('description', 512))
    .default(''),
  attachments: yup
    .array<any, FileUploadAttachment>()
    .required(RULE_MESSAGES.MC1('attach CV'))
    .min(1, RULE_MESSAGES.MC1('attach CV'))
    .default([]),
  candidate_exp: yup.array().of(candidateExp).default([]),
  candidate_educate: yup.array().of(candidateEducate).default([]),
  candidate_award: yup.array().of(award).default([]),
  candidate_certificate: yup.array().of(certificate).default([]),
  avatar: yup.string(),
  entity_skill_records: yup
    .array()
    .of(
      entitySkill.test(
        'unique-skill-type',
        'Skill type must be unique',
        function (value, context) {
          const { parent } = context
          const skillTypeIds = parent.map((item: any) => item.skill_type_id)
          const duplicates = skillTypeIds.filter(
            (id: string, index: number) => skillTypeIds.indexOf(id) !== index
          )
          if (duplicates.includes(value.skill_type_id)) {
            return this.createError({
              path: `${this.path}.skill_type_id`,
              message: `Skill type has already existed`,
            })
          }

          return true
        }
      )
    )
    .default([]),
  avatarUrl: yup.string().default(''),
})

export const GetCandidate = yup.object({
  name: yup.string().default(''),
  gender: yup.string().default(''),
  phone: yup.string().default(''),
  email: yup.string().default(''),
  address: yup.string().default(''),
  dob: yup.mixed<Dayjs>().nullable(),
  country: yup.string().default(''),
  reference_type: yup.string().default(''),
  reference_value: yup.string().default(''),
  reference_uid: yup.string().default(''),
  recruit_time: yup.mixed<Dayjs>(),
  description: yup.string().default(''),
  attachments: yup.array<any, FileUploadAttachment>().default([]),
  candidate_exp: yup.array().of(candidateExp).default([]),
  candidate_educate: yup.array().of(candidateEducate).default([]),
  candidate_award: yup.array().of(award).default([]),
  candidate_certificate: yup.array().of(certificate).default([]),
  avatar: yup.string(),
  entity_skill_records: yup.array().of(entitySkill).default([]),
  avatarUrl: yup.string().default(''),
})

export type FormDataSchemaCreateCandidate = yup.InferType<
  typeof CreateCandidate
>

export type FormDataSchemaEditCandidate = yup.InferType<typeof EditCandidate>

export type FormDataSchemaGetCandidate = yup.InferType<typeof GetCandidate>

export type FormDataSchemaEducate = yup.InferType<typeof candidateEducate>

export type FormDataSchemaAttachment = yup.InferType<typeof attachmentInput>

export type FormDataSchemaEXP = yup.InferType<typeof candidateExp>

export type FormDataSchemaAward = yup.InferType<typeof award>

export type FormDataSchemaCertificate = yup.InferType<typeof certificate>

export type FormDataSchemaEntitySkill = yup.InferType<typeof entitySkill>
// export type FormDataSchemaSkill = yup.InferType<typeof skill>

const renderLabelReference = (type: string) => {
  let label = ''
  switch (type) {
    case 'eb':
    case 'rec':
      label = 'Recruit channel'
      break
    case 'hiring_platform':
      label = 'Recruit platform'
      break
    case 'reference':
      label = 'Referrer'
      break
    case 'headhunt':
      label = 'Headhunter'
      break
    default:
      label = 'candidate_source_value'
      break
  }

  return label
}
