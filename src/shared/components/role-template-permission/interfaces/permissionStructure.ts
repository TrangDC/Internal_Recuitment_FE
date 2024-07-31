import _ from 'lodash'
import { roleTemplateInformation } from 'shared/constants/permission'
import CandidateJobFeedbacksTemplatePermission from './role-template-permission/candidate_job_feedbacks'
import JobsTemplatePermission from './role-template-permission/jobs'
import CandidateJobTemplatePermission from './role-template-permission/candidate_job'
import CandidateTemplatePermission from './role-template-permission/candidate'
import HiringTeamTemplatePermission from './role-template-permission/hiring_teams'
import { InterviewTemplatePermissions } from './role-template-permission/interview'
import { SkillTypeTemplatePermissions } from './role-template-permission/skill_type'
import { SkillTemplatePermissions } from './role-template-permission/skill'
import { RoleTemplateTemplatePermissions } from './role-template-permission/role_template'
import { moduleActions } from 'features/authorization/domain/interfaces/permission-refactor'
import { EmailTemplateTemplatePermissions } from './role-template-permission/email_template'
import ReportTemplatePermission from './role-template-permission/report'
import { UserTemplatePermissions } from './role-template-permission/User'
import EntityPermission from 'shared/schema/database/entity_permission'
import Permission from 'shared/schema/database/permission'
import { NewEntityPermissionInput } from 'shared/schema/database/user'

interface PermissionGroup {
  id: string
  title: string
  group_type: string
  permissions: Permission[]
}

export interface CustomPermission {
  id: string
  for_all: boolean
  for_owner: boolean
  for_team: boolean
  title: string
  description: string
}

export type GenerateActionCustomPermission<A extends string> = {
  [K in A]: CustomPermission
}

export interface RoleTemplate {
  CANDIDATE_JOB_FEEDBACKS: CandidateJobFeedbacksTemplatePermission
  JOBS: JobsTemplatePermission
  CANDIDATES: CandidateTemplatePermission
  CANDIDATE_JOBS: CandidateJobTemplatePermission
  HIRING_TEAMS: HiringTeamTemplatePermission
  INTERVIEWS: InterviewTemplatePermissions
  SKILL_TYPES: SkillTypeTemplatePermissions
  SKILLS: SkillTemplatePermissions
  USER: UserTemplatePermissions
  ROLES_TEMPLATE: RoleTemplateTemplatePermissions
  EMAIL_TEMPLATE: EmailTemplateTemplatePermissions
  REPORT: ReportTemplatePermission
}

class RoleTemplateStructure implements RoleTemplate {
  CANDIDATE_JOB_FEEDBACKS: CandidateJobFeedbacksTemplatePermission
  JOBS: JobsTemplatePermission
  CANDIDATES: CandidateTemplatePermission
  CANDIDATE_JOBS: CandidateJobTemplatePermission
  HIRING_TEAMS: HiringTeamTemplatePermission
  INTERVIEWS: InterviewTemplatePermissions
  SKILL_TYPES: SkillTypeTemplatePermissions
  SKILLS: SkillTemplatePermissions
  USER: UserTemplatePermissions
  ROLES_TEMPLATE: RoleTemplateTemplatePermissions
  EMAIL_TEMPLATE: EmailTemplateTemplatePermissions
  REPORT: ReportTemplatePermission

  constructor(data: RoleTemplateStructure) {
    this.CANDIDATE_JOB_FEEDBACKS = data.CANDIDATE_JOB_FEEDBACKS
    this.JOBS = data.JOBS
    this.CANDIDATES = data.CANDIDATES
    this.CANDIDATE_JOBS = data.CANDIDATE_JOBS
    this.HIRING_TEAMS = data.HIRING_TEAMS
    this.SKILL_TYPES = data.SKILL_TYPES
    this.INTERVIEWS = data.INTERVIEWS
    this.SKILLS = data.SKILLS
    this.ROLES_TEMPLATE = data.ROLES_TEMPLATE
    this.USER = data.USER
    this.EMAIL_TEMPLATE = data.EMAIL_TEMPLATE
    this.REPORT = data.REPORT
  }

  static fromJson(params: PermissionGroup[]): RoleTemplateStructure {
    const roleTemplate: RoleTemplateStructure = {} as RoleTemplateStructure
    params.forEach((permissionGroups) => {
      permissionGroups.permissions.forEach((permission) => {
        const operation_name = permission.operation_name
        const title = permission.title

        for (const [moduleKey, actions] of Object.entries(moduleActions)) {
          if (Object.values(actions).includes(operation_name)) {
            const key = Object.keys(actions).find(
              (k) => actions[k as keyof typeof actions] === operation_name
            ) as keyof typeof actions

            if (key && roleTemplate) {
              const permissionRole: CustomPermission = {
                id: permission.id,
                for_all: permission.for_all,
                for_owner: permission.for_owner,
                for_team: permission.for_team,
                title: permission.title,
                description: roleTemplateInformation[title]?.description,
              }
              _.set(roleTemplate, `${moduleKey}.${key}`, permissionRole)
            }
            break
          }
        }
      })
    })

    return roleTemplate
  }

  static formatDefault(params: PermissionGroup[]): PermissionFormData {
    const roleTemplate: PermissionFormData = {}
    params.forEach((permissionGroups) => {
      permissionGroups.permissions.forEach((permission) => {
        const permissionId = permission.id
        const permissionRole: ValuePermission = {
          id: '',
          value: {
            for_all: false,
            for_owner: false,
            for_team: false,
          },
          permissionId: permissionId,
        }
        _.set(roleTemplate, permissionId, permissionRole)
      })
    })
    return roleTemplate
  }

  static formatEditDefault(
    params: PermissionGroup[],
    getEditValue: EntityPermission[]
  ): PermissionFormData {
    const roleTemplate: PermissionFormData = {}
    params.forEach((permissionGroups) => {
      permissionGroups.permissions.forEach((permission) => {
        const getValue = getEditValue.find(
          (value) => value.permission.id === permission.id
        )
        const permissionId = permission.id
        const permissionRole: ValuePermission = {
          id: getValue?.id ?? '',
          value: {
            for_all: getValue?.for_all ?? false,
            for_owner: getValue?.for_owner ?? false,
            for_team: getValue?.for_team ?? false,
          },
          permissionId: permissionId,
        }
        _.set(roleTemplate, permissionId, permissionRole)
      })
    })
    return roleTemplate
  }

  static formatDefaultEntityPermissions(
    params: PermissionGroup[],
    getEditValue: EntityPermission[]
  ): PermissionFormData {
    const roleTemplate: PermissionFormData = {}
    params.forEach((permissionGroups) => {
      permissionGroups.permissions.forEach((permission) => {
        const getValue = getEditValue.find(
          (value) => value.permission.id === permission.id
        )
        const permissionId = permission.id
        const permissionRole: ValuePermission = {
          id: getValue?.id ?? '',
          value: {
            for_all: false,
            for_owner: false,
            for_team: false,
          },
          permissionId: permissionId,
        }
        _.set(roleTemplate, permissionId, permissionRole)
      })
    })
    return roleTemplate
  }

  static formatEditCreateValue(
    permissionFormData: PermissionFormData
  ): NewEntityPermissionInput[] {
    const entityPermissionsInputs: NewEntityPermissionInput[] = []
    Object.keys(permissionFormData).forEach((key) => {
      const valuePermission: ValuePermission = _.get(permissionFormData, key)
      const everyThingOnly = valuePermission?.value?.for_all ?? false
      const teamOnly = valuePermission?.value?.for_team ?? false
      const ownedOnly = valuePermission?.value?.for_owner ?? false
      const id = valuePermission?.id ?? ''
      if (everyThingOnly || teamOnly || ownedOnly) {
        const entityPermissionsInput: NewEntityPermissionInput = {
          for_all: everyThingOnly ?? false,
          for_owner: ownedOnly ?? false,
          for_team: teamOnly ?? false,
          id: id ?? '',
          permission_id: key,
        }
        entityPermissionsInputs.push(entityPermissionsInput)
      }
    })
    return entityPermissionsInputs
  }
}

export default RoleTemplateStructure

export interface ValuePermission {
  value: ActionPermission
  id: string
  permissionId: string
}

export interface ActionPermission {
  for_owner: boolean
  for_all: boolean
  for_team: boolean
}

export interface MergePermissionValue {
  [key: string]: ActionPermission
}

export interface PermissionFormData {
  [key: string]: ValuePermission
}
