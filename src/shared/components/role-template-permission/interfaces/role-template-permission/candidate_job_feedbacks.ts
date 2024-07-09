import { CANDIDATE_JOB_FEEDBACKS_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/candidate_job_feedbacks'
import { GenerateActionCustomPermission } from '../permissionStructure'

interface CandidateJobFeedbacksTemplatePermission
  extends GenerateActionCustomPermission<
    keyof typeof CANDIDATE_JOB_FEEDBACKS_ACTIONS
  > {}

export default CandidateJobFeedbacksTemplatePermission
