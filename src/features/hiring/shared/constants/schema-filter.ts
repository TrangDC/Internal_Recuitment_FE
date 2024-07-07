import { createSchemaFilter } from 'shared/components/table/functions'

const customInterfaceHiringTeam = createSchemaFilter({
  role_id: 'string[]',
  team_id: 'string[]',
})

export type HiringTeamFilter = typeof customInterfaceHiringTeam
