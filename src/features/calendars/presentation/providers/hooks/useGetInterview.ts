import useGraphql from 'features/calendars/domain/graphql'
import { CandidateInterview } from 'features/calendars/domain/interfaces'
import useGetResource from 'shared/hooks/useEditResource/useGetResource'
import { GetInterviewFrom, getOneInterviewSchema } from '../constants/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertFromUTC } from 'shared/utils/date'

export interface IuseGetInterview {
  id: string
}
function useGetInterview({ id }: IuseGetInterview) {
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
      const interview_date = convertFromUTC(
        new Date(data.interview_date)
      ).toDate()
      const start_from = convertFromUTC(new Date(data.start_from)).toDate()
      const end_at = convertFromUTC(new Date(data.end_at)).toDate()
      return {
        id: data.id,
        candidateEmail: data.candidate_job.candidate.email,
        description: data.description,
        interviewer: data.interviewer ?? [],
        phone: data.candidate_job.candidate.phone,
        candidateName: data.candidate_job.candidate.name,
        title: data.title,
        interview_date: interview_date,
        end_at: end_at,
        start_from: start_from,
        team: data.candidate_job.hiring_job.team.name,
        job: data.candidate_job.hiring_job.name,
      }
    },
  })

  return {
    useFormReturn,
    isGetting: isGetting,
  }
}

export default useGetInterview
