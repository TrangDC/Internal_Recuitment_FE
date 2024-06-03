import useGraphql from 'features/calendars/domain/graphql'
import { CandidateInterview } from 'features/calendars/domain/interfaces'
import useGetResource from 'shared/hooks/crud-hook/useEditResource/useGetResource'
import { GetInterviewFrom, getOneInterviewSchema } from '../constants/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { formatStringToDate } from '../../page-sections/google-calendar/functions'

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
    formatDefaultValues: (data: CandidateInterview) => {
      const { currentDate, newEnd, newStart } = formatStringToDate(
        data.start_from,
        data.end_at,
        data.interview_date
      )
      return {
        id: data.id,
        candidateEmail: data.candidate_job.candidate.email,
        description: data.description,
        interviewer: data.interviewer ?? [],
        phone: data.candidate_job.candidate.phone,
        candidateName: data.candidate_job.candidate.name,
        title: data.title,
        interview_date: currentDate,
        end_at: newEnd,
        start_from: newStart,
        team: data.candidate_job.hiring_job.team.name,
        job: data.candidate_job.hiring_job.name,
        hiring_job_id: data.candidate_job.hiring_job_id,
        candidate_id: data.candidate_job.candidate_id,
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
