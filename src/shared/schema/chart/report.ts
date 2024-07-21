import Team from '../database/team'
import { Pagination } from '../pagination'

export type ReportFilterPeriod = 'all' | 'year' | 'quarter' | 'month' | 'week'

export type ReportFilter = {
  filter_period: ReportFilterPeriod
  from_date: string
  to_date: string
}

export type ReportCandidateConversionRateChartResponse = {
  data: CandidateConversionRateReport
}

export type CandidateJobStepReportByTeamResponse = {
  data: CandidateJobStepByTeam[]
}

export type ReportApplicationReportTableResponse = {
  data: ApplicationReportTable
}

export type ApplicationReportTable = {
  processing: ApplicationReportProcessing
  kiv: ApplicationReportFailReason
  offered_lost: ApplicationReportFailReason
}

export type ApplicationReportProcessing = {
  invite_to_interview: number
  interviewing: number
  done: number
  cancelled: number
}

export type ApplicationReportFailReason = {
  poor_professionalism: number
  poor_fit_and_engagement: number
  over_expectations: number
  over_qualification: number
  language_deficiency: number
  weak_technical_skills: number
  poor_interpersonal_skills: number
  poor_problem_solving_skills: number
  poor_management_skills: number
  candidate_withdrawal: number
  others: number
}

export type ReportCandidateConversionRateTableResponse = {
  edges: CandidateConversionRateReportEdge[]
  pagination: Pagination
}

export type CandidateConversionRateReportEdge = {
  node: CandidateConversionRateReport2
}

export interface CandidateConversionRateReport2
  extends CandidateConversionRateReport {
  id: string
  team_name: string
}

export type CandidateJobStepByTeam = {
  team: Team
  candidate_job_step_by_status: CandidateJobStepByCandidateJobStatus[]
}

export type CandidateJobStepByCandidateJobStatus = {
  candidate_job_status: string
  amount: number
}

export type CandidateConversionRateReport = {
  applied: number
  interviewing: number
  offering: number
  hired: number
}

export type ReportNumberByType = {
  type: string
  number: number
}

export type RangeDateColumnBar = {
  from_date: string
  to_date: string
}