import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../../shared/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { Fragment, useEffect, useMemo, useState } from 'react'
import useGetCandidateJobInterview from '../../../hooks/crud/useGetCandidateJobInterview'
import { useParams } from 'react-router-dom'
import { ListInterview } from 'features/interviews/presentation/page-sections'
import Cant from 'features/authorization/presentation/components/Cant'
import CandidateJob from 'shared/schema/database/candidate_job'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import CandidateInterview from 'shared/schema/database/candidate_interview'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const { id } = useParams()
  const [statusSelected, setStatusSelected] = useState<string>()

  const { candidateJobInterview } = useGetCandidateJobInterview(id as string)
  const candidateJobOfTeamId =
    jobApplicationDetail?.hiring_job?.hiring_team?.id ?? ''
  const listEnabled: {
    feedback: CandidateJobFeedback[]
    interview: CandidateInterview[]
  } = useMemo(() => {
    //@ts-ignore
    return candidateJobInterview?.[statusSelected]
  }, [statusSelected, candidateJobInterview])

  useEffect(() => {
    jobApplicationDetail?.status &&
      setStatusSelected(jobApplicationDetail?.status)
  }, [jobApplicationDetail?.status])

  const show_feedback = useMemo(() => {
    const stepsLength = jobApplicationDetail?.steps?.length - 1
    const max_step = jobApplicationDetail?.steps?.[stepsLength]
    return max_step?.candidate_job_status === statusSelected
  }, [jobApplicationDetail, statusSelected])

  return (
    <DivActionWrapper>
      <DivAction>
        <StepInterview
          steps={jobApplicationDetail?.steps}
          onChange={setStatusSelected}
          defaultValue={jobApplicationDetail?.status}
        />
      </DivAction>
      <Divider />
      <Fragment>
        <Cant
          module="INTERVIEWS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
          }}
        >
          <DivAction>
            <ListInterview
              jobApplicationDetail={jobApplicationDetail}
              listInterview={listEnabled?.interview}
            />
          </DivAction>
        </Cant>
        <Divider />
      </Fragment>

      <DivAction>
        <Cant
          module="CANDIDATE_JOB_FEEDBACKS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['VIEW.everything', 'VIEW.ownedOnly', 'VIEW.teamOnly'],
          }}
        >
          <ListFeedBack
            listFeedback={listEnabled?.feedback}
            candidateJobOfTeamId={candidateJobOfTeamId}
            show_feedback={show_feedback}
          />
        </Cant>
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
