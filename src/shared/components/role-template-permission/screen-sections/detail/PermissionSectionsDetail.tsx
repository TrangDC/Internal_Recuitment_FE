import { Text13md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useState } from 'react'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import RoleTemplateStructure from '../../interfaces/permissionStructure'
import TeamPermissionGroupDetail from '../../components/detail/TeamPermissionGroupDetail'
import JobPermissionGroupDetail from '../../components/detail/JobPermissionGroupDetail'
import CandidatePermissionGroupDetail from '../../components/detail/CandidatePermissionGroupDetail'
import CandidateJobsPermissionGroupDetail from '../../components/detail/CandidateJobsPermissionGroupDetail'
import FeedbackPermissionGroupDetail from '../../components/detail/FeedbackPermissionGroupDetail'
import InterviewPermissionGroupDetail from '../../components/detail/InterviewPermissionGroupDetail'
import RoleTemplatePermissionGroupDetail from '../../components/detail/RoleTemplatePermissionGroupDetail'
import HiringTeamPermissionGroupDetail from '../../components/detail/HiringTeamPermissionGroupDetail'
import SkillPermissionGroupDetail from '../../components/detail/SkillPermissionGroupDetail'
import SkillTypePermissionGroupDetail from '../../components/detail/SkillTypePermissionGroupDetail'

type PermissionSectionsProps = {
  roleTemplate: RoleTemplateStructure | undefined
  isGetting: boolean
}

function PermissionSectionsDetail({ roleTemplate }: PermissionSectionsProps) {
  const [open, setOpen] = useState(true)
  if (!roleTemplate) return null
  return (
    <AppCollapse open={open} setOpen={setOpen} title="Permission">
      <FlexBox flexDirection={'column'} gap={2}>
        <Text13md fontWeight={700}>FUNCTION</Text13md>
        <TeamPermissionGroupDetail roleTemplate={roleTemplate} />
        <JobPermissionGroupDetail roleTemplate={roleTemplate} />
        <CandidatePermissionGroupDetail roleTemplate={roleTemplate} />
        <CandidateJobsPermissionGroupDetail roleTemplate={roleTemplate} />
        <FeedbackPermissionGroupDetail roleTemplate={roleTemplate} />
        <InterviewPermissionGroupDetail roleTemplate={roleTemplate} />
      </FlexBox>
      <FlexBox flexDirection={'column'} gap={2}>
        <Text13md fontWeight={700}>SYSTEM</Text13md>
        <RoleTemplatePermissionGroupDetail roleTemplate={roleTemplate} />
        <HiringTeamPermissionGroupDetail roleTemplate={roleTemplate} />
        <SkillPermissionGroupDetail roleTemplate={roleTemplate} />
        <SkillTypePermissionGroupDetail roleTemplate={roleTemplate} />
      </FlexBox>
    </AppCollapse>
  )
}

export default PermissionSectionsDetail