import { createSchemaFilter } from 'shared/components/table/functions'

const customInterfaceHiringTeam = createSchemaFilter({
  role_id: 'string[]',
  hiring_team_id: 'string[]',
})

export type HiringTeamFilter = typeof customInterfaceHiringTeam
