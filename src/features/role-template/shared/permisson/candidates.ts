const candidates = {
  UpdateCandidate: {
    action: 'edit',
    module: 'CANDIDATES',
  },
  CreateCandidate: {
    action: 'create',
    module: 'CANDIDATES',
  },
  SetBlackListCandidate: {
    action: 'update_blacklist',
    module: 'CANDIDATES',
  },
  'GetCandidate,GetAllCandidates': {
    action: 'view',
    module: 'CANDIDATES',
  },
  DeleteCandidate: {
    action: 'delete',
    module: 'CANDIDATES',
  },
}

export default candidates
