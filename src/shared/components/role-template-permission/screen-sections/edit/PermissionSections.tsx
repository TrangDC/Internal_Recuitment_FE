import { Text13md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useEffect, useState } from 'react'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TeamPermissionGroup from '../../components/edit/TeamPermissionGroup'
import JobPermissionGroup from '../../components/edit/JobPermissionGroup'
import CandidatePermissionGroup from '../../components/edit/CandidatePermissionGroup'
import CandidateJobsPermissionGroup from '../../components/edit/CandidateJobsPermissionGroup'
import FeedbackPermissionGroup from '../../components/edit/FeedbackPermissionGroup'
import InterviewPermissionGroup from '../../components/edit/InterviewPermissionGroup'
import HiringTeamPermissionGroup from '../../components/edit/HiringTeamPermissionGroup'
import RoleTemplatePermissionGroup from '../../components/edit/RoleTemplatePermissionGroup'
import SkillPermissionGroup from '../../components/edit/SkillPermissionGroup'
import SkillTypePermissionGroup from '../../components/edit/SkillTypePermissionGroup'
import { useFormContext } from 'react-hook-form'
import useResetValue from '../../hooks/useDisableAction'
import { getKeyName } from '../../utils/utils'
import RoleTemplateStructure from '../../interfaces/permissionStructure'
import EmailTemplatePermissionGroup from '../../components/edit/EmailTemplatePermissionGroup'
import ReportPermissionGroup from '../../components/edit/ReportPermissionGroup'

type PermissionSectionsProps = {
  roleTemplate: RoleTemplateStructure | undefined
  isGetting: boolean
}

function PermissionSections({ roleTemplate }: PermissionSectionsProps) {
  const [open, setOpen] = useState(true)
  const { watch } = useFormContext()
  const { resetValue } = useResetValue()
  const viewCandidateName = roleTemplate?.CANDIDATES.VIEW.id
  const viewCandidateJobName = roleTemplate?.CANDIDATE_JOBS.VIEW.id

  const viewCandidate = watch(getKeyName(viewCandidateName ?? ''))
  const viewCandidateJob = watch(getKeyName(viewCandidateJobName ?? ''))

  const cantViewCandidate =
    viewCandidate?.for_all ||
    viewCandidate?.for_owner ||
    viewCandidate?.for_team

  const cantViewCandidateJob =
    viewCandidateJob?.for_all ||
    viewCandidateJob?.for_owner ||
    viewCandidateJob?.for_team

  const candidateJobName = [
    roleTemplate?.CANDIDATE_JOBS.VIEW.id,
    roleTemplate?.CANDIDATE_JOBS.CREATE.id,
    roleTemplate?.CANDIDATE_JOBS.EDIT.id,
    roleTemplate?.CANDIDATE_JOBS.CHANGE_STATUS.id,
    roleTemplate?.CANDIDATE_JOBS.DELETE.id,
  ]
  const candidateJobFeedbackName = [
    roleTemplate?.CANDIDATE_JOB_FEEDBACKS.VIEW.id,
    roleTemplate?.CANDIDATE_JOB_FEEDBACKS.CREATE.id,
    roleTemplate?.CANDIDATE_JOB_FEEDBACKS.DELETE.id,
  ]
  const interviewName = [
    roleTemplate?.INTERVIEWS.VIEW.id,
    roleTemplate?.INTERVIEWS.INTERVIEWING.id,
    roleTemplate?.INTERVIEWS.CREATE.id,
    roleTemplate?.INTERVIEWS.EDIT.id,
    roleTemplate?.INTERVIEWS.CHANGE_INTERVIEW.id,
    roleTemplate?.INTERVIEWS.DELETE.id,
  ]
  useEffect(() => {
    if (!cantViewCandidate || !cantViewCandidateJob) {
      resetValue([
        ...candidateJobName,
        ...candidateJobFeedbackName,
        ...interviewName,
      ])
    }
  }, [cantViewCandidate, cantViewCandidateJob])
  if (!roleTemplate) return null
  return (
    <AppCollapse open={open} setOpen={setOpen} title="Permission">
      <FlexBox flexDirection={'column'} gap={2}>
        <Text13md fontWeight={700}>FUNCTION</Text13md>
        <TeamPermissionGroup roleTemplate={roleTemplate} />
        <JobPermissionGroup roleTemplate={roleTemplate} />
        <CandidatePermissionGroup roleTemplate={roleTemplate} />
        <CandidateJobsPermissionGroup
          roleTemplate={roleTemplate}
          moduleDisabled={!cantViewCandidate}
        />
        <FeedbackPermissionGroup
          roleTemplate={roleTemplate}
          moduleDisabled={!cantViewCandidate || !cantViewCandidateJob}
        />
        <InterviewPermissionGroup
          roleTemplate={roleTemplate}
          moduleDisabled={!cantViewCandidate || !cantViewCandidateJob}
        />
        <ReportPermissionGroup roleTemplate={roleTemplate} />
      </FlexBox>
      <FlexBox flexDirection={'column'} gap={2}>
        <Text13md fontWeight={700}>SYSTEM</Text13md>
        <RoleTemplatePermissionGroup roleTemplate={roleTemplate} />
        <HiringTeamPermissionGroup roleTemplate={roleTemplate} />
        <SkillPermissionGroup roleTemplate={roleTemplate} />
        <SkillTypePermissionGroup roleTemplate={roleTemplate} />
        <EmailTemplatePermissionGroup roleTemplate={roleTemplate} />
      </FlexBox>
    </AppCollapse>
  )
}

export default PermissionSections
