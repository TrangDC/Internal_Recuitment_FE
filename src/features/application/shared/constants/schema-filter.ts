import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  hiring_job_id: 'string[]',
  hiring_team_id: 'string[]',
  status: 'string',
  rec_id: 'string[]',
  level: 'string',
  page_job: 'string'
})

export type ApplicationFilter = typeof customInterface

