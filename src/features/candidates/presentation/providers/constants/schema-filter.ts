import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  reference_uid: 'string[]',
  status: 'string',
  recruit_time_from_date: 'string',
  recruit_time_to_date: 'string',
  failed_reason: 'string[]',
})

export type CandidateFilter = typeof customInterface
