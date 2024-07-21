import { GenerateAction } from '.'

export const REPORT_ACTIONS = {
  VIEW: 'ReportCandidateLCC,ReportCandidateColumnChart,ReportApplication,ReportApplicationReportTable,ReportCandidateConversionRateChart,ReportCandidateConversionRateTable',
}
export interface ReportPermissions
  extends GenerateAction<keyof typeof REPORT_ACTIONS> {}
