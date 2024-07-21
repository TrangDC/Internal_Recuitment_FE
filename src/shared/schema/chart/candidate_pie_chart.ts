export type ReportCandidateLCCResponse = {
    data: ReportCandidateLCC
  }
  
  export type ReportCandidateLCC = {
    total: number
    non_black_list: number
    recruitment: ReportRecruitment
  }
  
  export type ReportRecruitment = {
    eb: number
    rec: number
    hiring_platform: number
    reference: number
    headhunt: number
  }