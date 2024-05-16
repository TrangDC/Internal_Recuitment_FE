import duotone from 'shared/components/icons';

export const navigations = [
  { type: 'label', label: 'Dashboard' },
  { name: 'Teams', path: '/dashboard/teams', icon: duotone.Team },
  { name: 'Jobs', path: '/dashboard/jobs', icon: duotone.Jobs },
  {
    name: 'Candidates',
    path: '/dashboard/candidates',
    icon: duotone.Candidates,
  },
  {
    name: 'Calendars',
    path: '/dashboard/calendars',
    icon: duotone.Calender,
  },
  {
    name: 'Hiring team',
    path: '/dashboard/hiring',
    icon: duotone.HiringTeam,
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: duotone.Settings,
  },
];
