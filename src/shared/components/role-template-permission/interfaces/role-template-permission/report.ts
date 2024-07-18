import { GenerateActionCustomPermission } from '../permissionStructure'
import { REPORT_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/report'

interface ReportTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof REPORT_ACTIONS> {}

export default ReportTemplatePermission
