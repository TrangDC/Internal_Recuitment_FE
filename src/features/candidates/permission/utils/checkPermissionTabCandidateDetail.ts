import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import _ from 'lodash'
import { RenderItem } from 'shared/components/tab'

function checkPermissionTabCandidateDetail(
  role: PermissionStructureImpl | null,
  tabs: RenderItem[]
) {
  const cloneTab = [...tabs]
  const hasViewCandidateActivities = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
    },
    module: 'CANDIDATE_ACTIVITIES',
  })
  if (!hasViewCandidateActivities)
    _.remove(cloneTab, (action) => action.label === 'Activities')
  return cloneTab
}

export default checkPermissionTabCandidateDetail
