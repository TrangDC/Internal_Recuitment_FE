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
  kiv: number
  offer_lost: number
  ex_staff: number
}
