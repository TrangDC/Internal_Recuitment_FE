import Team from "../database/team"

export type ReportFilterPeriod = 'all' | 'year' | 'quarter' | 'month' | 'week'

export type ReportFilter = {
  filter_period: ReportFilterPeriod
  from_date: string
  to_date: string
}

export type CandidateReportResponse = {
  data: CandidateReport
}

export type RecruitmentReportResponse = {
  data: ReportStatsByTime
}

export type ReportCandidateConversionRateChartResponse = {
  data: CandidateConversionRateReport
}

export type CandidateJobStepReportByTeamResponse = {
  data: CandidateJobStepByTeam[]
}


export type CandidateJobStepByTeam = {
  team: Team
  candidate_job_step_by_status: CandidateJobStepByCandidateJobStatus[]
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


export type CandidateJobStepByCandidateJobStatus = {
  candidate_job_status: string
  amount: number
}

export type CandidateJobByFailedReason = {
  failed_reason: string
  amount: number
}


export type CandidateConversionRateReport = {
  applied: number
  interviewing: number
  offering: number
  hired: number
}

export type CandidateReport = {
  total: number
  active_number: number
  blacklist_number: number
  number_by_ref_type: ReportNumberByType[]
  stats_by_time: ReportStatsByTime
}

export type ReportNumberByType = {
  type: string
  number: number
}

export type ReportStatsByTime = {
  total: number
  number_by_type: ReportNumberByType[]
  stats_per_time_period: ReportStatsPerTimePeriod[]
}

export type ReportStatsPerTimePeriod = {
  from_date: string
  to_date: string
  total: string
  number_by_type: ReportNumberByType[]
}
