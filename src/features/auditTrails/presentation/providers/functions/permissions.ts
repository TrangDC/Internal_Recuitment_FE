import { renderValueReturn } from '.'
import { renderText, renderTextPermissions } from '../helper'

enum Field {
  HIRING_TEAMS  = 'hiring_teams',
  SKILL_TYPES = 'skill_types',
  JOB_POSITIONS = 'job_positions',
  CANDIDATE_JOB_FEEDBACK = 'candidate_job_feedbacks',
  CANDIDATE_JOBS = 'candidate_jobs',
  REC_TEAMS = 'rec_teams',
  CANDIDATE_INTERVIEWS = 'candidate_interviews',
  EMAIL_TEMPLATES = 'email_templates',
  CANDIDATE_ACTIVITIES = 'candidate_activities',
  USERS = 'users',
  ROLES = 'roles',
  HIRING_JOBS = 'hiring_jobs',
  CANDIDATES = 'candidates',
  SKILLS = 'skills'
}

const audit_trails_permissions: Record<Field, renderValueReturn> = {
  [Field.HIRING_TEAMS]: renderTextPermissions,
  [Field.SKILL_TYPES]: renderTextPermissions,
  [Field.JOB_POSITIONS]: renderTextPermissions,
  [Field.CANDIDATE_JOB_FEEDBACK]: renderTextPermissions,
  [Field.CANDIDATE_JOBS]: renderTextPermissions,
  [Field.REC_TEAMS]: renderTextPermissions,
  [Field.CANDIDATE_INTERVIEWS]: renderTextPermissions,
  [Field.EMAIL_TEMPLATES]: renderTextPermissions,
  [Field.CANDIDATE_ACTIVITIES]: renderTextPermissions,
  [Field.USERS]: renderTextPermissions,
  [Field.ROLES]: renderTextPermissions,
  [Field.HIRING_JOBS]: renderTextPermissions,
  [Field.CANDIDATES]: renderTextPermissions,
  [Field.SKILLS]: renderTextPermissions,
}
export function renderFieldPermissions(field: string): renderValueReturn {
  return audit_trails_permissions[field as Field] ?? renderText
}
