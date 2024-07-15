import Team from "../database/team"

export type ReportFilter = {
  period: PeriodFilter
  from_date: string
  to_date: string
}
export type PeriodFilter = 'all' | 'year' | 'quarter' | 'month' | 'week'

export type CandidateReportResponse = {
  data: CandidateReport
}

export type CandidateJobReportResponse = {
  data: CandidateJobReportColumnChart
}

export type CandidateJobReportByStatusResponse = {
  data: CandidateJobReportByStatus
}
export type CandidateJobStepReportResponse = {
  data: CandidateJobStepByCandidateJobStatus[]
}

export type CandidateJobStepReportByTeamResponse = {
  data: CandidateJobStepByTeam[]
}

export type CandidateJobStepByTeam = {
  team: Team
  candidate_job_step_by_status: CandidateJobStepByCandidateJobStatus[]
}

export type CandidateJobStepByCandidateJobStatus = {
  candidate_job_status: string
  amount: number
}

export type CandidateJobReportByStatus = {
  processing_candidate_job_data: CandidateInterviewByStatus[]
  kiv_candidate_job_data: CandidateJobByFailedReason[]
  offer_lost_candidate_job_data: CandidateJobByFailedReason[]
}

export type CandidateInterviewByStatus = {
  status: string
  amount: number
}

export type CandidateJobByFailedReason = {
  failed_reason: string
  amount: number
}

export type CandidateJobReportColumnChart = {
  total: number
  column_data: CandidateJobReportColumn[]
}

export type CandidateJobReportColumn = {
  from_date: string
  to_date: string
  data: CandidateJobByStatus[]
}

export type CandidateJobByStatus = {
  status: string
  amount: number
}

export type CandidateReport = {
  total: number
  blacklist: number
  pie_chart_data: CandidateAmountByReferenceType[]
  column_chart_data: CandidateReportColumnChart
}

export type CandidateReportColumnChart = {
  total: number
  column_data: CandidateReportColumn[]
}

export type CandidateReportColumn = {
  from_date: string
  to_date: string
  data: CandidateAmountByReferenceType[]
}

export type CandidateAmountByReferenceType = {
  reference_type: string
  amount: number
}

export type CandidateReferenceType = {
  reference_type: string
  amount: number
}
