import { SvgIconProps } from '@mui/material'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import duotone from 'shared/components/icons'

export type ILabelSideBar = {
  type: string
  label: string
}

export type IMenuSideBar = {
  name: string
  path: string
  icon: (props: SvgIconProps) => JSX.Element
  type: 'extLink' | 'link'
  module: keyof PermissionStructureImpl
  children?: IMenuSideBar[]
  iconText?: string
}

export type INavigation = ILabelSideBar | IMenuSideBar

export const navigation: INavigation[] = [
  { type: 'label', label: 'Function' },
  {
    name: 'Report',
    path: '/dashboard/reports',
    icon: duotone.ReportIcon,
    type: 'link',
    module: 'TEAMS',
  },
  {
    name: 'Teams',
    path: '/dashboard/teams',
    icon: duotone.Team,
    type: 'link',
    module: 'TEAMS',
  },
  {
    name: 'Jobs',
    path: '/dashboard/jobs',
    icon: duotone.Jobs,
    type: 'link',
    module: 'JOBS',
  },
  {
    name: 'Candidates',
    path: '/dashboard/candidates',
    icon: duotone.Candidates,
    type: 'link',
    module: 'CANDIDATES',
  },
  {
    name: 'Calendars',
    path: '/dashboard/calendars',
    icon: duotone.Calender,
    type: 'link',
    module: 'INTERVIEWS',
  },
  { type: 'label', label: 'System' },
  {
    name: 'Role template',
    path: '/dashboard/role-template',
    icon: duotone.Settings,
    type: 'link',
    module: 'ROLES_TEMPLATE',
  },
  {
    name: 'Hiring team',
    path: '/dashboard/hiring',
    icon: duotone.HiringTeam,
    type: 'link',
    module: 'HIRING_TEAMS',
  },
  {
    name: 'Skill management',
    path: '/dashboard/skill',
    icon: duotone.Skill,
    type: 'link',
    module: 'SKILLS',
  },
  {
    name: 'Email notification setting',
    path: '/dashboard/email-notification',
    icon: duotone.Email,
    type: 'link',
    module: 'EMAIL_TEMPLATE',
  },
  // {
  //   name: 'Settings',
  //   path: '/dashboard/settings',
  //   icon: duotone.Settings,
  // },
];
