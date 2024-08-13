import useGraphql from 'features/calendars/domain/graphql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import {
  GetInterviewFrom,
  getOneInterviewSchema,
} from 'features/calendars/shared/constants/validate'
import { formatStringToDate } from 'features/calendars/presentation/page-sections/google-calendar/functions'
import useGetResource from 'shared/hooks/crud-hook/refactor/useGetResource'

export interface IUseGetInterview {
  id: string
}
function useGetInterview({ id }: IUseGetInterview) {
  const navigate = useNavigate()
  const { getCandidateInterview, queryKey } = useGraphql()
  const { useFormReturn, isGetting } = useGetResource<
    CandidateInterview,
    GetInterviewFrom
  >({
    id: id,
    oneBuildQuery: getCandidateInterview,
    queryKey: [queryKey],
    resolver: yupResolver(getOneInterviewSchema),
    formatDefaultValues: (data) => {
      const { currentDate, newEnd, newStart } = formatStringToDate(
        data?.start_from ?? new Date().toString(),
        data?.end_at ?? new Date().toString(),
        data?.interview_date ?? new Date().toString()
      )
      return {
        id: data?.id ?? '',
        candidateEmail: data?.candidate_job.candidate.email ?? '',
        description: data?.description ?? '',
        interviewer: data?.interviewer || [],
        phone: data?.candidate_job.candidate.phone ?? '',
        candidateName: data?.candidate_job.candidate.name ?? '',
        title: data?.title ?? '',
        interview_date: currentDate,
        end_at: newEnd,
        start_from: newStart,
        team: data?.candidate_job.hiring_job.hiring_team.name ?? '',
        job: data?.candidate_job.hiring_job.name ?? '',
        hiring_job_id: data?.candidate_job.hiring_job_id ?? '',
        candidate_id: data?.candidate_job.candidate_id ?? '',
        candidateJobOfTeamId:
          data?.candidate_job?.hiring_job?.hiring_team?.id ?? '',
        location: data?.location ?? '',
        meeting_link: data?.meeting_link ?? '',
        status:data?.status ?? "invited_to_interview"
      }
    },
  })
  const { getValues } = useFormReturn

  function navigateToCandidate() {
    navigate(`/dashboard/candidate-detail/${getValues('candidate_id')}`)
  }

  function navigateToCandidateJob() {
    navigate(`/dashboard/job-detail/${getValues('hiring_job_id')}`)
  }
  return {
    useFormReturn,
    isGetting: isGetting,
    navigateToCandidateJob,
    navigateToCandidate,
  }
}

export default useGetInterview
