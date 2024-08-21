import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import _ from 'lodash'
import { RenderItem } from 'shared/components/tab'

function checkPermissionTabCandidateActivities(
  role: PermissionStructureImpl | null,
  tabs: RenderItem[]
) {
  const cloneTabs = [...tabs]
  const hasViewFeedback = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'CANDIDATE_JOB_FEEDBACKS',
  })

  const hasViewInterview = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const hasViewEmail = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'EMAIL_TEMPLATE',
  })
  if (!hasViewFeedback) _.remove(cloneTabs, (tab) => tab.label === 'Feedbacks')
  if (!hasViewInterview)
    _.remove(cloneTabs, (tab) => tab.label === 'Interviews')
  if (!hasViewEmail) _.remove(cloneTabs, (tab) => tab.label === 'Emails')
  return cloneTabs
}

export default checkPermissionTabCandidateActivities
