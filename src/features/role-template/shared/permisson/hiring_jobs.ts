const hiring_jobs = {
  DeleteHiringJob: {
    action: 'delete',
    module: 'HIRING_JOBS',
  },
  UpdateHiringJob: {
    action: 'edit',
    module: 'HIRING_JOBS',
  },
  'GetHiringJob,GetAllHiringJobs': {
    action: 'view',
    module: 'HIRING_JOBS',
  },
  CreateHiringJob: {
    action: 'create',
    module: 'HIRING_JOBS',
  },
  UpdateHiringJobStatus: {
    action: 'close_job',
    module: 'HIRING_JOBS',
  },
}
export default hiring_jobs
