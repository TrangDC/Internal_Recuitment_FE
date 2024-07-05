import candidate_interviews from './candidate_interviews'
import candidate_job_feedbacks from './candidate_job_feedbacks'
import candidate_jobs from './candidate_jobs'
import candidates from './candidates'
import hiring_jobs from './hiring_jobs'
import roles_template from './roles_template'
import skills from './skill'
import skill_types from './skill_types'
import teams from './teams'
import users from './users'

export const operation_name = {
  ...skill_types,
  ...candidate_interviews,
  ...candidate_job_feedbacks,
  ...skills,
  ...hiring_jobs,
  ...roles_template,
  ...users,
  ...candidates,
  ...teams,
  ...candidate_jobs,
}
