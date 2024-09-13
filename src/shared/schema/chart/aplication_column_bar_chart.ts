export type ReportApplicationResponse = {
  edges: ReportApplicationEdge
}

export type ReportApplicationEdge = {
  node: ReportApplication[]
}

export type ReportApplication = {
  from_date: string
  to_date: string
  applied: number
  interviewing: number
  offering: number
  hired: number
  failed_cv: number
  failed_interview: number
  offer_lost: number
  ex_staff: number
}

export type ReportApplicationHired = {
  director: number
  fresher: number
  intern: number
  job_position_name: string
  junior: number
  manager: number
  middle: number
  senior: number
}
