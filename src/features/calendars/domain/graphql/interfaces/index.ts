export type NewIntefviewInput = {
  title: string
  candidate_id: string[]
  interviewer: string[]
  interview_date: string
  start_from: string
  end_at: string
  description: string
  job_id: string
}

export type CandidateInterview = {
  id: string
  title: string
  interview_date: string
  start_from: string
  end_at: string
}

export type FilterCalendar = {
  from_date?: string
  to_date?: string
}
