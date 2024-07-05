const candidate_jobs = {
  'GetCandidateJob,GetAllCandidateJobs,GetCandidateJobGroupByStatus,GetCandidateJobGroupByInterview':
    {
      action: 'view',
      module: 'CANDIDATE_JOBS',
    },
  CreateCandidateJob: {
    action: 'apply',
    module: 'CANDIDATE_JOBS',
  },
  UpdateCandidateJobStatus: {
    action: 'change_status',
    module: 'CANDIDATE_JOBS',
  },
  DeleteCandidateJob: {
    action: 'delete',
    module: 'CANDIDATE_JOBS',
  },
  UpdateCandidateJobAttachment: {
    action: 'edit',
    module: 'CANDIDATE_JOBS',
  },
}

export default candidate_jobs
