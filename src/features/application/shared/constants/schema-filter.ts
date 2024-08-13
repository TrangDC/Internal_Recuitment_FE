import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  hiring_job_ids: 'string[]',
  hiring_team_ids: 'string[]',
  status: 'string',
  rec_id: 'string[]',
  levels: 'string[]',
  page_job: 'string'
})

export type ApplicationFilter = typeof customInterface

