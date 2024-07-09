import { BaseRecord } from 'shared/interfaces'
import { JOBS_ACTIONS, JobsPermissions } from './jobs'
import {
  CANDIDATE_JOB_FEEDBACKS_ACTIONS,
  CandidateJobFeedbacksPermissions,
} from './candidate_job_feedbacks'
import { EntityPermission } from '../role'
import { CANDIDATE_JOB_ACTIONS, CandidateJobPermissions } from './candidate_job'
import { HIRING_TEAM_ACTIONS, HiringTeamPermissions } from './hiring_team'
import { INTERVIEW_ACTIONS, InterviewPermissions } from './interview'
import { SKILL_TYPE_ACTIONS, SkillTypePermissions } from './skill_type'
import { SKILL_ACTIONS, SkillPermissions } from './skills'
import { CANDIDATE_ACTIONS, CandidatePermissions } from './candidate'
import _ from 'lodash'
import { TEAM_ACTIONS, TeamPermissions } from './team'
import { ROLE_TEMPLATE_ACTIONS, RoleTemplatePermissions } from './role_template'

export type GenerateAction<A extends string> = {
  [K in A]: PermissionRole
}

type GenerateModuleActions<T> = {
  [K in keyof T]: BaseRecord
}
interface PermissionRole {
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
}

export interface PermissionStructure {
  JOBS: JobsPermissions
  CANDIDATE_JOB_FEEDBACKS: CandidateJobFeedbacksPermissions
  CANDIDATES: CandidatePermissions
  CANDIDATE_JOBS: CandidateJobPermissions
  HIRING_TEAMS: HiringTeamPermissions
  INTERVIEWS: InterviewPermissions
  SKILL_TYPES: SkillTypePermissions
  SKILLS: SkillPermissions
  TEAMS: TeamPermissions
  ROLES_TEMPLATE: RoleTemplatePermissions
}

export const moduleActions: GenerateModuleActions<PermissionStructure> = {
  JOBS: JOBS_ACTIONS,
  CANDIDATE_JOB_FEEDBACKS: CANDIDATE_JOB_FEEDBACKS_ACTIONS,
  CANDIDATES: CANDIDATE_ACTIONS,
  CANDIDATE_JOBS: CANDIDATE_JOB_ACTIONS,
  HIRING_TEAMS: HIRING_TEAM_ACTIONS,
  INTERVIEWS: INTERVIEW_ACTIONS,
  SKILLS: SKILL_ACTIONS,
  SKILL_TYPES: SKILL_TYPE_ACTIONS,
  TEAMS: TEAM_ACTIONS,
  ROLES_TEMPLATE: ROLE_TEMPLATE_ACTIONS,
}

class PermissionStructureImpl implements PermissionStructure {
  JOBS: JobsPermissions
  CANDIDATE_JOB_FEEDBACKS: CandidateJobFeedbacksPermissions
  CANDIDATES: CandidatePermissions
  CANDIDATE_JOBS: CandidateJobPermissions
  HIRING_TEAMS: HiringTeamPermissions
  INTERVIEWS: InterviewPermissions
  SKILL_TYPES: SkillTypePermissions
  SKILLS: SkillPermissions
  TEAMS: TeamPermissions
  ROLES_TEMPLATE: RoleTemplatePermissions

  constructor(data: PermissionStructure) {
    this.JOBS = data.JOBS
    this.CANDIDATE_JOB_FEEDBACKS = data.CANDIDATE_JOB_FEEDBACKS
    this.CANDIDATES = data.CANDIDATES
    this.CANDIDATE_JOBS = data.CANDIDATE_JOBS
    this.HIRING_TEAMS = data.HIRING_TEAMS
    this.INTERVIEWS = data.INTERVIEWS
    this.SKILL_TYPES = data.SKILL_TYPES
    this.SKILLS = data.SKILLS
    this.TEAMS = data.TEAMS
    this.ROLES_TEMPLATE = data.ROLES_TEMPLATE
  }

  static fromJson(
    entityPermission: EntityPermission[]
  ): PermissionStructure | null {
    const permissions: Partial<PermissionStructure> = {
      JOBS: {} as JobsPermissions,
      CANDIDATE_JOB_FEEDBACKS: {} as CandidateJobFeedbacksPermissions,
    }
    for (const [moduleKey, actions] of Object.entries(moduleActions)) {
      for (const [actionKey, operationName] of Object.entries(actions)) {
        const entity = entityPermission.find(
          (e) => operationName === e.permission.operation_name
        )
        const permissionRole: PermissionRole = {
          ownedOnly: entity?.for_owner || false,
          teamOnly: entity?.for_team || false,
          everything: entity?.for_all || false,
        }
        _.set(permissions, `${moduleKey}.${actionKey}`, permissionRole)
      }
    }
    return new PermissionStructureImpl(permissions as PermissionStructure)
  }
}

export default PermissionStructureImpl

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never

export type PermissionName<M extends keyof PermissionStructureImpl> = Leaves<
  PermissionStructureImpl[M]
>

export type CheckActions<M extends keyof PermissionStructureImpl> = {
  compare: 'hasAny' | 'hasAll'
  permissions: PermissionName<M>[]
}

export type ModuleName = keyof PermissionStructureImpl
