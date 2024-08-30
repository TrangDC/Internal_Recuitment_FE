import { createSchemaFilter } from 'shared/components/table/functions'

export const customInterface = createSchemaFilter({
  hiring_team_ids: 'string[]',
  rec_team_ids: 'string[]',
  job_position_ids: 'string[]',
  rec_in_charge_ids: 'string[]',
  priorities: 'string[]',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
  status: 'string',
  page_job: 'string',
  has_rec_in_charge: 'string',
})

export type JobsFilter = typeof customInterface

const customInterfaceJobOpening = createSchemaFilter({
  hiring_team_ids: 'string[]',
  rec_team_ids: 'string[]',
  job_position_ids: 'string[]',
  rec_in_charge_ids: 'string[]',
  priorities: 'string[]',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
  has_rec_in_charge: 'string',
})

export type JobsFilterOpening = typeof customInterfaceJobOpening

const customInterfaceJobPendingApproval = createSchemaFilter({
  hiring_team_ids: 'string[]',
  rec_team_ids: 'string[]',
  job_position_ids: 'string[]',
  rec_in_charge_ids: 'string[]',
  priorities: 'string[]',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
  has_rec_in_charge: 'string',
})

export type JobsFilterPendingApproval = typeof customInterfaceJobPendingApproval

const customInterfaceMyApprovals = createSchemaFilter({
  hiring_team_ids: 'string[]',
  rec_team_ids: 'string[]',
  job_position_ids: 'string[]',
  priorities: 'string[]',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
})

export type JobsFilterApprovals = typeof customInterfaceMyApprovals

const customInterfaceApprovalRejected = createSchemaFilter({
  hiring_team_ids: 'string[]',
  rec_team_ids: 'string[]',
  job_position_ids: 'string[]',
  rec_in_charge_ids: 'string[]',
  priorities: 'string[]',
  skill_ids: 'string[]',
  location: 'string',
  created_by_ids: 'string[]',
  has_rec_in_charge: 'string',
})

export type ApprovalRejected = typeof customInterfaceApprovalRejected
