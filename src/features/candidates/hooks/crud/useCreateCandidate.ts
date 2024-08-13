import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { FormDataSchema } from '../../shared/constants/schema'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CandidateAwardInput,
  CandidateCertificateInput,
  CandidateEducateInput,
  CandidateExpInput,
  CandidateGenderEnum,
  CandidateReferenceType,
  CreateCandidateArguments,
} from 'shared/schema/database/candidate'
import {
  CreateCandidate,
  FormDataSchemaCreateCandidate,
} from 'features/candidates/shared/constants/formSchema'
import { CandidateCVData } from 'features/candidates/domain/interfaces'
import {
  formatDataFormCandidateCV,
  formatSkillToEntitySkillRecords,
  pickAttachment,
} from 'features/candidates/shared/utils'
import { EntitySkillRecordInput } from 'shared/schema/database/hiring_job'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
  candidateData?: CandidateCVData
}

function useCreateCandidate(props: createCandidateProps) {
  const { callbackSuccess, candidateData } = props
  const { createCandidate, queryKey } = useGraphql()
  function formatToDefaultData(
    data?: CandidateCVData
  ): FormDataSchemaCreateCandidate {
    const defaultValues = formatDataFormCandidateCV(data)
    return defaultValues
  }
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateArguments,
    FormDataSchemaCreateCandidate
  >({
    mutationKey: [queryKey],
    queryString: createCandidate,
    defaultValues: async () => formatToDefaultData(candidateData),
    resolver: yupResolver(CreateCandidate),
    onSuccess: callbackSuccess,
  })

  const {
    handleSubmit,
    control,
    formState,
    watch,
    setValue,
    clearErrors,
    getValues,
  } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const skills = value.entity_skill_records || []
      const entity_skill: EntitySkillRecordInput[] =
        formatSkillToEntitySkillRecords(skills)
      const attachments = pickAttachment(value?.attachments || [])
      const award: CandidateAwardInput[] = value.candidate_award.map(
        (o, index) => {
          const attachments = pickAttachment(o.attachments || [])
          return {
            id: '',
            achieved_date: o.achieved_date
              ? o.achieved_date?.toISOString()
              : null,
            attachments: attachments,
            name: o.name,
            order_id: index + 1,
          }
        }
      )

      const certificate: CandidateCertificateInput[] =
        value.candidate_certificate.map((o, index) => {
          const attachments = pickAttachment(o.attachments || [])
          return {
            id: '',
            order_id: index + 1,
            achieved_date: o.achieved_date
              ? o.achieved_date?.toISOString()
              : null,
            attachments: attachments,
            name: o.name,
            score: o.score ?? '',
          }
        })

      const educate: CandidateEducateInput[] = value.candidate_educate.map(
        (o, index) => {
          const attachments = pickAttachment(o.attachments || [])
          return {
            id: '',
            order_id: index + 1,
            attachments: attachments,
            description: o.description ?? '',
            end_date: o.end_date ? o.end_date.toISOString() : null,
            gpa: o.gpa || '',
            is_current: o.is_current,
            location: o.location || '',
            major: o.major || '',
            school_name: o.school_name || '',
            start_date: o.start_date ? o.start_date.toISOString() : null,
          }
        }
      )
      const exp: CandidateExpInput[] = value.candidate_exp.map((o, index) => ({
        id: '',
        order_id: index + 1,
        company: o.company || '',
        description: o.description || '',
        end_date: o.end_date ? o.end_date.toISOString() : null,
        is_current: o.is_current,
        location: o.location || '',
        position: o.position || '',
        start_date: o.start_date ? o.start_date.toISOString() : null,
      }))
      const payload: CreateCandidateArguments = {
        input: {
          dob: value.dob ? value.dob.toISOString() : null,
          recruit_time: value.recruit_time.toISOString(),
          attachments: attachments,
          entity_skill_records: entity_skill,
          country: value?.country ?? '',
          description: value.description ?? '',
          email: value.email ?? '',
          phone: value.phone ?? '',
          reference_type: value?.reference_type as CandidateReferenceType,
          reference_uid: value.reference_uid ?? '',
          reference_value: value.reference_value ?? '',
          name: value.name ?? '',
          address: value?.address ?? '',
          gender: (value?.gender ?? '') as CandidateGenderEnum,
          candidate_award: award,
          candidate_certificate: certificate,
          candidate_educate: educate,
          candidate_exp: exp,
          avatar: '',
        },
        note: '',
      }
      mutate(payload)
    })()
  }

  const resetSourceValue = () => {
    setValue('reference_value', '')
    clearErrors('reference_value')
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    getValues,
    actions: {
      resetSourceValue,
    },
    useCreateReturn,
    useFormReturn,
  }
}

export default useCreateCandidate
