import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  hiring_team_ids: 'string[]',
  status: 'string',
  priority: 'string',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
})

export type JobsFilter = typeof customInterface

const customInterfaceJobOpening = createSchemaFilter({
  hiring_job_ids: 'string[]',
  hiring_team_ids: 'string[]',
  priority: 'string',
  skill_id: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
  page_job: 'string',
})

export type JobsFilterOpening = typeof customInterfaceJobOpening
