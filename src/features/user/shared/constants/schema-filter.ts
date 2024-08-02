import { createSchemaFilter } from 'shared/components/table/functions'

const customInterfaceHiringTeam = createSchemaFilter({
  role_id: 'string[]',
  hiring_team_id: 'string[]',
  team_type: 'string',
  rec_team_ids: 'string[]',
})

export type HiringTeamFilter = typeof customInterfaceHiringTeam
