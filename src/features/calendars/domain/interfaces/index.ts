export type NewInterviewInput = {
  title: string
  candidate_id: string[]
  interviewer: string[]
  interview_date: string
  start_from: string
  end_at: string
  description: string
  job_id: string
}

export type UpdateCandidateInterviewInput = {
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
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

export type CandidateInterview = {
  id: string
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: User[]
  candidate_job: CandidateJob
  edit_able: boolean
  created_at: string
  updated_at: string
}

type User = {
  id: string
  name: string
  work_email: string
  status: string
}

type CandidateJob = {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: string
  candidate: Candidate
  hiring_job: HiringJob
}

type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  status: string
  is_black_list: boolean
  last_apply_date: string
  created_at: string
  updated_at: string
  deleted_at: string
}

type HiringJob = {
  id: string
  name: string
  team: Team
}

type Team = {
  id: string
  name: string
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
