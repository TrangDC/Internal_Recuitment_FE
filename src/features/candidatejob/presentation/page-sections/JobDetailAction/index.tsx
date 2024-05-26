import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../providers/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListInterview from 'features/interviews/presentation/page-sections/ListInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import useGetCandidateJobInterview from '../../providers/hooks/useGetCandidateJobInterview'
import { useParams } from 'react-router-dom'
import { FeedBack } from 'features/feedback/domain/interfaces'
import { Interview } from 'features/interviews/domain/interfaces'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const { id } = useParams()
  const showInterview = useMemo(() => {
    return (
      jobApplicationDetail.status === STATUS_CANDIDATE.APPLIED ||
      jobApplicationDetail.status === STATUS_CANDIDATE.INTERVIEWING
    )
  }, [jobApplicationDetail?.status])
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
        <StepInterview onChange={setStatusSelected} defaultValue={jobApplicationDetail.status}/>
      </DivAction>
      <Divider />
      {showInterview && (
        <Fragment>
          <DivAction>
            <ListInterview jobApplicationDetail={jobApplicationDetail} listInterview={listEnabled?.interview}/>
          </DivAction>
          <Divider />
        </Fragment>
      )}

      <DivAction>
        <ListFeedBack listFeedback={listEnabled?.feedback} />
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
