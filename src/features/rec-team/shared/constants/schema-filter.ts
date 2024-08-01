import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  leader_ids: 'string[]',
})

export type RecTeamFilter = typeof customInterface
