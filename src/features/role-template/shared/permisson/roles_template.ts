const roles_template = {
  DeleteRole: {
    action: 'delete',
    module: 'ROLES_TEMPLATE',
  },
  UpdateRole: {
    action: 'edit',
    module: 'ROLES_TEMPLATE',
  },
  'GetRole,GetAllRoles': {
    action: 'view',
    module: 'ROLES_TEMPLATE',
  },
  CreateRole: {
    action: 'create',
    module: 'ROLES_TEMPLATE',
  },
}

export default roles_template
