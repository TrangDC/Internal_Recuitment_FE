import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  team_ids: 'string[]',
  status: 'string',
  priority: 'string',
})

export type JobsFilter = typeof customInterface
