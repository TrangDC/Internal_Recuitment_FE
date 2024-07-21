export type ReportCandidateColumnChartResponse = {
  edges: ReportCandidateColumnChartEdge
}

export type ReportCandidateColumnChartEdge = {
  node: ReportRecruitment[]
}

export type ReportRecruitment = {
  eb: number
  rec: number
  hiring_platform: number
  reference: number
  headhunt: number
  from_date: string
  to_date: string
}
