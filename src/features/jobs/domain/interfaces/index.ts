import Candidate from 'shared/schema/database/candidate'
import HiringJob from 'shared/schema/database/hiring_job'
import TalenaJobDescription from 'shared/schema/talena/talena_jd'

export type CandidateStatusItem = {
  id: string
  candidate_id: string
  status: string
  hiring_job_id: string
  hiring_job: HiringJob
  attachments: {
    id: string
    document_name: string
    document_id: string
  }
  candidate: Candidate
  created_at: string
  updated_at: string
}

export type JobDescriptionData = {
  data: TalenaJobDescription
}
