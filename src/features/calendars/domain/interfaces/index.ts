export type NewInterviewInput = {
  title: string
  candidate_id: string[]
  interviewer: string[]
  interview_date: string
  start_from: string
  end_at: string
  description: string
  job_id: string
  location: string
  meeting_link: string
}

export type UpdateCandidateInterviewInput = {
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
  location: string
  meeting_link: string
  note: string
}

export type FilterCalendar = {
  interview_date_from: string
  interview_date_to: string
}

export type EditIntefviewInput = {
  title: string
  candidate_id: string[]
  interviewer: string[]
  interview_date: string
  start_from: string
  end_at: string
  description: string
  job_id: string
}

export type UpdateCandidateInterviewScheduleInput = {
  interview_date: string
  start_from: string
  end_at: string
  interviewer?: string[]
}

export type PayloadDragDropInput = {
  id: string
  input: UpdateCandidateInterviewScheduleInput
}

export type UpdateCandidateInterviewStatusInput = {
  status: 'done' | 'cancelled'
}
