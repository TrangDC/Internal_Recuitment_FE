import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../providers/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { Fragment, useEffect, useMemo, useState } from 'react'
import useGetCandidateJobInterview from '../../providers/hooks/useGetCandidateJobInterview'
import { useParams } from 'react-router-dom'
import { FeedBack } from 'features/feedback/domain/interfaces'
import { Interview } from 'features/interviews/domain/interfaces'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { ListInterview } from 'features/interviews/presentation/page-sections'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const { id } = useParams()
  const [statusSelected, setStatusSelected] = useState<string>();
  const { candidateJobInterview } = useGetCandidateJobInterview(id as string)

  const listEnabled: {feedback: FeedBack[], interview: Interview[]} = useMemo(() => {
    //@ts-ignore
    return candidateJobInterview?.[statusSelected]
  }, [statusSelected, candidateJobInterview])

  useEffect(() => {
    jobApplicationDetail.status && setStatusSelected(jobApplicationDetail.status)
  }, [jobApplicationDetail.status])

  return (
    <DivActionWrapper>
      <DivAction>
        <StepInterview steps={jobApplicationDetail.steps} onChange={setStatusSelected} defaultValue={jobApplicationDetail.status}/>
      </DivAction>
      <Divider />
        <Fragment>
          <DivAction>
            <ListInterview jobApplicationDetail={jobApplicationDetail} listInterview={listEnabled?.interview}/>
          </DivAction>
          <Divider />
        </Fragment>

      <DivAction>
        <ListFeedBack listFeedback={listEnabled?.feedback} />
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
