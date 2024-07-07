import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../../shared/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { Fragment, useEffect, useMemo, useState } from 'react'
import useGetCandidateJobInterview from '../../../hooks/crud/useGetCandidateJobInterview'
import { useParams } from 'react-router-dom'
import { FeedBack } from 'features/feedback/domain/interfaces'
import { Interview } from 'features/interviews/domain/interfaces'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { ListInterview } from 'features/interviews/presentation/page-sections'
import Cant from 'features/authorization/presentation/components/Cant'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const { id } = useParams()
  const [statusSelected, setStatusSelected] = useState<string>()
  const { candidateJobInterview } = useGetCandidateJobInterview(id as string)
  const candidateJobOfTeamId = jobApplicationDetail?.hiring_job?.team?.id ?? ''
  const listEnabled: { feedback: FeedBack[]; interview: Interview[] } =
    useMemo(() => {
      //@ts-ignore
      return candidateJobInterview?.[statusSelected]
    }, [statusSelected, candidateJobInterview])

  useEffect(() => {
    jobApplicationDetail?.status &&
      setStatusSelected(jobApplicationDetail?.status)
  }, [jobApplicationDetail?.status])

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
          />
        </Cant>
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
