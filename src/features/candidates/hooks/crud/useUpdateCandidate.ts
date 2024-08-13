import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useEditResource } from 'shared/hooks/crud-hook'
import Candidate, {
  CandidateAwardInput,
  CandidateCertificateInput,
  CandidateEducateInput,
  CandidateExpInput,
  CandidateGenderEnum,
  CandidateReferenceType,
  UpdateCandidateArguments,
} from 'shared/schema/database/candidate'
import {
  EditCandidate,
  FormDataSchemaEditCandidate,
} from 'features/candidates/shared/constants/formSchema'
import dayjs from 'dayjs'
import useGetImage from 'shared/components/upload/hooks/useGetImage'
import {
  AttachmentAction,
  AttachmentFolder,
} from 'shared/schema/database/attachment'
import {
  formatSkillToEntitySkillRecords,
  formatToFormDataSchemaEntitySkill,
  makeOldAttachment,
  pickAttachment,
} from 'features/candidates/shared/utils'
import { EntitySkillRecordInput } from 'shared/schema/database/hiring_job'

type UseEditCandidateProps = {
  id: string
  onSuccess: (data: Candidate) => void
}

function useUpdateCandidate(props: UseEditCandidateProps) {
  const { id, onSuccess } = props
  const { getUrl } = useGetImage()
  const { updateCandidate, getCandidate, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Candidate,
    FormDataSchemaEditCandidate,
    UpdateCandidateArguments
  >({
    resolver: yupResolver(EditCandidate),
    editBuildQuery: updateCandidate,
    oneBuildQuery: getCandidate,
    queryKey: [queryKey],
    id,
    onSuccess: (data) => {
      const candidate: Candidate = data[updateCandidate.operation]?.data
      onSuccess?.(candidate)
    },
    formatDefaultValues: async (data) => {
      const avatar = await getUrl({
        action: AttachmentAction.DOWNLOAD,
        fileName: 'avatar',
        folder: AttachmentFolder.CANDIDATE,
        id: data?.avatar ?? '',
      })
      const candidate_award = data?.candidate_award || []
      const candidate_certificate = data?.candidate_certificate || []
      const candidate_educate = data?.candidate_educate || []
      const candidate_exp = data?.candidate_exp || []
      const entity_skill_types = data?.entity_skill_types || []
      const skills = formatToFormDataSchemaEntitySkill(entity_skill_types)
      const att = data?.attachments || []
      const attachments = makeOldAttachment(att)
      const award = candidate_award.map((o) => {
        const att = o.attachments || []
        const attachments = makeOldAttachment(att)
        return {
          id: o.id,
          name: o.name ?? '',
          achieved_date: o.achieved_date ? dayjs(o.achieved_date) : null,
          attachments: attachments,
        }
      })

      const certificate = candidate_certificate.map((o) => {
        const att = o.attachments || []
        const attachments = makeOldAttachment(att)
        return {
          attachments: attachments,
          achieved_date: o.achieved_date ? dayjs(o.achieved_date) : null,
          score: o.score ?? '',
          id: o.id,
          name: o.name ?? '',
        }
      })

      const educate = candidate_educate.map((o) => {
        const att = o.attachments || []
        const attachments = makeOldAttachment(att)
        return {
          id: o.id,
          school_name: o.school_name || '',
          major: o.major || '',
          gpa: o.gpa || '',
          start_date: o.start_date ? dayjs(o.start_date) : null,
          end_date: o.end_date ? dayjs(o.end_date) : null,
          location: o.location || '',
          description: o.description || '',
          attachments: attachments,
          is_current: o.is_current || false,
        }
      })

      const exp = candidate_exp.map((o) => ({
        id: o.id,
        position: o.position || '',
        company: o.company || '',
        location: o.location || '',
        start_date: o.start_date ? dayjs(o.start_date) : null,
        end_date: o.end_date ? dayjs(o.end_date) : null,
        description: o.description || '',
        is_current: o.is_current || false,
      }))
      return {
        email: data?.email ?? '',
        name: data?.name ?? '',
        phone: data?.phone ?? '',
        dob: data?.dob ? dayjs(data?.dob) : null,
        country: data?.country ?? '',
        reference_type: data?.reference_type ?? '',
        reference_value: data?.reference_value ?? '',
        description: data?.description ?? '',
        recruit_time: data?.recruit_time ? dayjs(data?.recruit_time) : dayjs(),
        reference_uid: data?.reference_uid ?? '',
        attachments: attachments,
        entity_skill_records: skills,
        candidate_award: award,
        candidate_certificate: certificate,
        candidate_educate: educate,
        candidate_exp: exp,
        gender: data?.gender ?? '',
        address: data?.address ?? '',
        avatar: data?.avatar,
        avatarUrl: avatar,
      }
    },
  })

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    watch,
    clearErrors,
    getValues,
  } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const skills = value.entity_skill_records || []
      const entity_skill: EntitySkillRecordInput[] =
        formatSkillToEntitySkillRecords(skills)
      const attachments = pickAttachment(value.attachments || [])
      const award: CandidateAwardInput[] = value.candidate_award.map(
        (o, index) => {
          const attachments = pickAttachment(o.attachments || [])
          return {
            id: o.id ?? '',
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
            id: o.id ?? '',
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
            id: o.id ?? '',
            order_id: index + 1,
            attachments: attachments,
            description: o.description ?? '',
            end_date: o.end_date ? o.end_date.toISOString() : null,
            gpa: o.gpa || '',
            is_current: o.is_current ?? false,
            location: o.location || '',
            major: o.major || '',
            school_name: o.school_name || '',
            start_date: o.start_date ? o.start_date.toISOString() : null,
          }
        }
      )
      const exp: CandidateExpInput[] = value.candidate_exp.map((o, index) => ({
        id: o.id ?? '',
        order_id: index + 1,
        company: o.company || '',
        description: o.description || '',
        end_date: o.end_date ? o.end_date.toISOString() : null,
        is_current: o.is_current ?? false,
        location: o.location || '',
        position: o.position || '',
        start_date: o.start_date ? o.start_date.toISOString() : null,
      }))
      const payload: UpdateCandidateArguments = {
        id: id,
        input: {
          dob: value.dob ? value.dob.toISOString() : null,
          recruit_time: value.recruit_time.toISOString(),
          attachments: attachments,
          entity_skill_records: entity_skill,
          country: value?.country ?? '',
          description: value?.description ?? '',
          email: value?.email ?? '',
          phone: value?.phone ?? '',
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
          avatar: value?.avatar ?? '',
        },
        note: note,
      }
      mutate(payload)
    })()
  }

  const resetSourceValue = () => {
    setValue('reference_value', '')
    clearErrors('reference_value')
  }

  return {
    actions: {
      onSubmit,
      resetSourceValue,
    },
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
    formState,
    watch,
    getValues,
    useFormReturn,
  }
}

export default useUpdateCandidate
