import { GenerateAction } from '.'

export const REPORT_ACTIONS = {
  VIEW: 'GetCandidateReport,GetRecruitmentReport,GetCandidateConversionRateReport,ReportCandidateConversionRateChart,ReportCandidateConversionRateTable,ReportApplicationReportTable',
}
export interface ReportPermissions
  extends GenerateAction<keyof typeof REPORT_ACTIONS> {}
