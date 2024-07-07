import { createSchemaFilter } from 'shared/components/table/functions'

const customInterface = createSchemaFilter({
  reference_uid: 'string[]',
  status: 'string',
  recruit_time_from_date: 'string',
  recruit_time_to_date: 'string',
  failed_reason: 'string[]',
  skill_ids: 'string[]',
  skill_type_ids: 'string[]',
  reference_type: 'string',
})

export type CandidateFilter = typeof customInterface
