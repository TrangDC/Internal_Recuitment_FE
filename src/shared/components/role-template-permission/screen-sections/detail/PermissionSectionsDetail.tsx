import { Text13md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useState } from 'react'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import RoleTemplateStructure from '../../interfaces/permissionStructure'
import JobPermissionGroupDetail from '../../components/detail/JobPermissionGroupDetail'
import CandidatePermissionGroupDetail from '../../components/detail/CandidatePermissionGroupDetail'
import CandidateJobsPermissionGroupDetail from '../../components/detail/CandidateJobsPermissionGroupDetail'
import FeedbackPermissionGroupDetail from '../../components/detail/FeedbackPermissionGroupDetail'
import InterviewPermissionGroupDetail from '../../components/detail/InterviewPermissionGroupDetail'
import RoleTemplatePermissionGroupDetail from '../../components/detail/RoleTemplatePermissionGroupDetail'
import SkillPermissionGroupDetail from '../../components/detail/SkillPermissionGroupDetail'
import SkillTypePermissionGroupDetail from '../../components/detail/SkillTypePermissionGroupDetail'
import ReportPermissionGroupDetail from '../../components/detail/ReportPermissionGroupDetail'
import UserPermissionGroupDetail from '../../components/detail/UserPermissionGroupDetail'
import HiringTeamPermissionGroupDetail from '../../components/detail/HiringTeamPermissionGroupDetail'
import EmailTemplatePermissionGroupDetail from '../../components/detail/EmailTemplatePermissionGroupDetail'
import JobPositionPermissionGroupDetail from '../../components/detail/JobPositionPermissionGroupDetail'

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
        <HiringTeamPermissionGroupDetail roleTemplate={roleTemplate} />
        <JobPermissionGroupDetail roleTemplate={roleTemplate} />
        <CandidatePermissionGroupDetail roleTemplate={roleTemplate} />
        <CandidateJobsPermissionGroupDetail roleTemplate={roleTemplate} />
        <FeedbackPermissionGroupDetail roleTemplate={roleTemplate} />
        <InterviewPermissionGroupDetail roleTemplate={roleTemplate} />
        <ReportPermissionGroupDetail roleTemplate={roleTemplate} />
      </FlexBox>
      <FlexBox flexDirection={'column'} gap={2}>
        <Text13md fontWeight={700}>SYSTEM</Text13md>
        <RoleTemplatePermissionGroupDetail roleTemplate={roleTemplate} />
        <UserPermissionGroupDetail roleTemplate={roleTemplate} />
        <SkillPermissionGroupDetail roleTemplate={roleTemplate} />
        <SkillTypePermissionGroupDetail roleTemplate={roleTemplate} />
        <JobPositionPermissionGroupDetail roleTemplate={roleTemplate} />
        <EmailTemplatePermissionGroupDetail roleTemplate={roleTemplate} />
      </FlexBox>
    </AppCollapse>
  )
}

export default PermissionSectionsDetail
