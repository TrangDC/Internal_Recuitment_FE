import { CandidateCVData } from 'features/candidates/domain/interfaces'
import _ from 'lodash'
import { FieldErrors } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  checkMaxSize,
  regexFile,
} from 'shared/components/form/inputFileUpload/utils'
import { FileUploadAttachment } from 'shared/components/form/uploadFileBox/types'
import Attachment from 'shared/schema/database/attachment'
import { pickDataInArray } from 'shared/utils/utils'
import {
  FormDataSchemaAward,
  FormDataSchemaCertificate,
  FormDataSchemaEducate,
  FormDataSchemaEntitySkill,
  FormDataSchemaEXP,
} from '../constants/formSchema'
import dayjs from 'dayjs'
import { CandidateGenderEnum } from 'shared/schema/database/candidate'
import { EntitySkillRecordInput } from 'shared/schema/database/hiring_job'
import EntitySkillType from 'shared/schema/database/entity_skill_type'

export const handleImportFile = async (
  file: File,
  validation: { regexString: string; maxSize: number },
  callback: (data: any) => void
) => {
  const regex = regexFile(file, validation.regexString)
  if (!regex) {
    toast.error(`One excel/csv file only, max to ${validation.maxSize}MB`)
    return
  }

  const maxSize = checkMaxSize(file, validation.maxSize)
  if (!maxSize) {
    toast.error(`One excel/csv file only, max to ${validation.maxSize}MB`)
    return
  }

  await callback(file)
}

export function isPresent(data: string) {
  const today = dayjs().format('DD/MM/YYYY')
  const endDate = dayjs(data).isValid()
    ? dayjs(data).format('DD/MM/YYYY')
    : data
  const synonyms = {
    Present: true,
    PRESENT: true,
    present: true,
    [today]: true,
  }
  return _.get(synonyms, endDate, false)
}

export function hasErrorsInArray(errors: FieldErrors, name: string) {
  const fieldErrors = _.get(errors, name, false)
  return !!fieldErrors
}

export function pickAttachment(att: FileUploadAttachment[]) {
  const attachments = pickDataInArray<FileUploadAttachment>(att, [
    'id',
    'document_name',
    'document_id',
  ])
  return attachments
}

export function makeOldAttachment(att: Attachment[]) {
  const attachments: FileUploadAttachment[] = att.map((o) => ({
    id: o?.id ?? '',
    document_id: o?.document_id ?? '',
    document_name: o?.document_name ?? '',
    file: null,
    status: 'old',
    url: '',
  }))
  return attachments
}

export function formatDataFormCandidateCV(data?: CandidateCVData) {
  const cvData = data?.data
  const att: FileUploadAttachment[] = data?.file
    ? [
        {
          id: data?.file?.id ?? '',
          document_id: data?.file?.document_id ?? '',
          document_name: data?.file?.document_name ?? '',
          file: null,
          status: 'old',
          url: '',
        },
      ]
    : []

  const experiences = cvData?.experiences ?? []
  const certificates = cvData?.certificates ?? []
  const educations = cvData?.educations ?? []
  const awards = cvData?.awards ?? []

  const candidate_exp: FormDataSchemaEXP[] = experiences.map((exp) => ({
    id: '',
    company: exp.company,
    description: exp.description.reduce(
      (a, b) => (a !== '' ? a + '\n' + b : a + b),
      ''
    ),
    location: '',
    position: exp.position,
    start_date: dayjs(exp.start_date).isValid()
      ? new Date(exp.start_date)
      : null,
    end_date: dayjs(exp.end_date).isValid() ? new Date(exp.end_date) : null,
    is_current: isPresent(exp.end_date),
  }))

  const candidate_certificate: FormDataSchemaCertificate[] = certificates.map(
    (cer) => ({
      id: '',
      attachments: [],
      name: cer.name,
      score: cer.score.toString(),
    })
  )

  const candidate_educate: FormDataSchemaEducate[] = educations.map((edu) => ({
    id: '',
    attachments: [],
    school_name: edu.school_name,
    description: edu.description.reduce(
      (a, b) => (a !== '' ? a + '\n' + b : a + b),
      ''
    ),
    gpa: edu.cpa_gpa.toString(),
    location: '',
    major: edu.major,
    end_date: dayjs(edu.end_date).isValid() ? new Date(edu.end_date) : null,
    start_date: dayjs(edu.start_date).isValid()
      ? new Date(edu.start_date)
      : null,
    is_current: isPresent(edu.end_date),
  }))

  const candidate_award: FormDataSchemaAward[] = awards.map((aw) => ({
    id: '',
    attachments: [],
    name: aw.name,
    achieved_date: dayjs(aw.date).isValid() ? new Date(aw.date) : null,
  }))

  return {
    name: cvData?.name ?? '',
    email: cvData?.email ?? '',
    phone: cvData?.phone ?? '',
    dob: cvData?.dob ? new Date(cvData?.dob) : null,
    reference_uid: '',
    description: '',
    address: cvData?.address ?? '',
    attachments: att,
    avatar: '',
    entity_skill_records: [],
    candidate_certificate: candidate_certificate,
    candidate_award: candidate_award,
    candidate_educate: candidate_educate,
    candidate_exp: candidate_exp,
    gender: CandidateGenderEnum.OTHERS,
    recruit_time: new Date(),
    reference_type: '',
    reference_value: '',
    country: 'Vietnam',
  }
}

export function formatSkillToEntitySkillRecords(
  skill: FormDataSchemaEntitySkill[]
): EntitySkillRecordInput[] {
  const entitySkillRecord: EntitySkillRecordInput[] = []
  skill.forEach((o, index) => {
    o.skill_id.forEach((s, index2) => {
      const i = index + 1
      const i2 = index2 + 1
      entitySkillRecord.push({
        id: '',
        orderId: i * 1000 + i2,
        skill_id: s,
      })
    })
  })
  return entitySkillRecord
}

export function formatToFormDataSchemaEntitySkill(
  data: EntitySkillType[]
): FormDataSchemaEntitySkill[] {
  const entitySkillFormData: FormDataSchemaEntitySkill[] = []
  data.forEach((e) => {
    const entitySkill: FormDataSchemaEntitySkill = {
      id: '',
      skill_type_id: e.id,
      skill_id: e.entity_skills.map((o) => o.skill_id),
    }
    entitySkillFormData.push(entitySkill)
  })
  return entitySkillFormData
}
