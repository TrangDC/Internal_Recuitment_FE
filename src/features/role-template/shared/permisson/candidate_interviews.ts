const candidate_interviews = {
  DeleteCandidateInterview: {
    action: 'delete',
    module: 'CANDIDATE_INTERVIEWS',
  },
  BeInterviewer: {
    action: 'interviewer',
    module: 'CANDIDATE_INTERVIEWS',
  },
  UpdateCandidateInterviewStatus: {
    action: 'change_status',
    module: 'CANDIDATE_INTERVIEWS',
  },
  'UpdateCandidateInterview,UpdateCandidateInterviewSchedule': {
    action: 'edit',
    module: 'CANDIDATE_INTERVIEWS',
  },
  'GetCandidateInterview,GetAllCandidateInterviews,GetAllCandidateInterview4Calendar':
    {
      view: 'view',
      module: 'CANDIDATE_INTERVIEWS',
    },
  'CreateCandidateInterview,CreateCandidateInterview4Calendar': {
    view: 'create',
    module: 'CANDIDATE_INTERVIEWS',
  },
}

export default candidate_interviews
