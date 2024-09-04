import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  hiring_job_ids: 'string[]',
  hiring_team_ids: 'string[]',
  status: 'string',
  rec_team_ids: 'string[]',
  levels: 'string[]',
  page_job: 'string',
  rec_in_charge_ids: 'string[]',
})

export type ApplicationFilter = typeof customInterface
