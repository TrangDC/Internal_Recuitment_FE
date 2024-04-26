import duotone from 'shared/components/icons';

export const navigations = [
  { type: 'label', label: 'Dashboard' },
  { name: 'Team', path: '/dashboard/teams', icon: duotone.PersonChalkboard },
  { name: 'Jobs', path: '/dashboard/jobs', icon: duotone.BadgeDollar },
  {
    name: 'Candidates',
    path: '/dashboard/candidates',
    icon: duotone.MessagesDollar,
  },
  {
    name: 'Calendars',
    path: '/dashboard/calendars',
    icon: duotone.MessagesDollar,
  },
  {
    name: 'Interviewer',
    path: '/dashboard/interviewer',
    icon: duotone.MessagesDollar,
  },
  {
    name: 'Hiring team',
    path: '/dashboard/hiring',
    icon: duotone.MessagesDollar,
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: duotone.MessagesDollar,
  },
];
