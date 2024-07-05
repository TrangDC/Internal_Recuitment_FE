type RoleTemplateInformation = {
  [x: string]: {
    description: string
  }
}

export const roleTemplateInformation:RoleTemplateInformation = {
  'model.permissions.teams.view': {
    description: 'Permission to view Team information',
  },
  'model.permissions.teams.create': {
    description: 'Permission to create new team',
  },
  'model.permissions.teams.update': {
    description: 'Permission to edit Team information',
  },
  'model.permissions.teams.delete': {
    description: 'Permission to delete team ',
  },
  'model.permissions.hiring_jobs.view': {
    description: 'Permission to view Job information and its hiring process',
  },
  'model.permissions.hiring_jobs.create': {
    description: 'Permission to create new job',
  },
  'model.permissions.hiring_jobs.edit': {
    description: 'Permission to edit Job information ',
  },
  'model.permissions.hiring_jobs.delete': {
    description: 'Permission to delete job ',
  },
  'model.permissions.hiring_jobs.close_job': {
    description: 'Permission to close Job ',
  },
  'model.permissions.candidates.view': {
    description:
      'Permission to view Candidate information and their application history ',
  },
  'model.permissions.candidates.create': {
    description: 'Permission to create new candidate ',
  },
  'model.permissions.candidates.edit': {
    description:
      'Permission to edit Candidate information and application history',
  },
  'model.permissions.candidates.update_blacklist': {
    description: 'Permission to add/ remove candidate to/ from blacklist',
  },
  'model.permissions.candidates.delete': {
    description: 'Permission to delete candidate ',
  },
  'model.permissions.candidate_jobs.view': {
    description: "Permission to view Candidates' application",
  },
  'model.permissions.candidate_jobs.apply': {
    description: 'Permission to submit a candidate to a job position',
  },
  'model.permissions.candidate_jobs.edit': {
    description:
      'Permission to update their information in the job hiring process',
  },
  'model.permissions.candidate_jobs.change_status': {
    description: 'Change status of an application in a hiring process',
  },
  'model.permissions.candidate_jobs.delete': {
    description: 'Permission to delete an application of a candidate',
  },
  'model.permissions.candidate_job_feedbacks.view': {
    description:
      "Permission to view recruiters' feedback about a candidate in a Hiring process",
  },
  'model.permissions.candidate_job_feedbacks.create': {
    description:
      'Permission to write or update feedback to candidate application',
  },
  'model.permissions.candidate_job_feedbacks.delete': {
    description: 'Delete a feedback',
  },
  'model.permissions.candidate_interviews.view': {
    description: 'Permission to view Interviews on calendar ',
  },
  'model.permissions.candidate_interviews.interviewer': {
    description: 'Permission to be an interviewer to interview candidates',
  },
  'model.permissions.candidate_interviews.create': {
    description: 'Permission to book an interview with candidate',
  },
  'model.permissions.candidate_interviews.edit': {
    description: 'Permission to edit an interview',
  },
  'model.permissions.candidate_interviews.change_status': {
    description: 'Permission to change an interview status',
  },
  'model.permissions.candidate_interviews.delete': {
    description: 'Permission to delete an interview',
  },
  'model.permissions.roles.view': {
    description: 'Permission to view Role information',
  },
  'model.permissions.roles.create': {
    description: 'Permission to create new role ',
  },
  'model.permissions.roles.update': {
    description: 'Permission to edit a role information',
  },
  'model.permissions.roles.delete': {
    description: 'Permission to delete role',
  },
  'model.permissions.users.view': {
    description: 'Permission to view users ',
  },
  'model.permissions.users.update': {
    description: "Permission to edit an user's information ",
  },
  'model.permissions.skills.view': {
    description: "Permission to edit an user's information ",
  },
  'model.permissions.skills.create': {
    description: 'Permission to create skill',
  },
  'model.permissions.skills.update': {
    description: 'Permission to edit skill',
  },
  'model.permissions.skills.delete': {
    description: 'Permission to delete skill',
  },
  'model.permissions.skill_types.view': {
    description: 'Permission to view skill type',
  },
  'model.permissions.skill_types.create': {
    description: 'Permission to create skill type',
  },
  'model.permissions.skill_types.update': {
    description: 'Permission to edit skill type',
  },
  'model.permissions.skill_types.delete': {
    description: 'Permission to delete skill type',
  },
}
