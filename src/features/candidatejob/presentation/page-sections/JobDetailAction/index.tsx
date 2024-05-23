import { Divider } from '@mui/material'
import { DivAction, DivActionWrapper } from '../../providers/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListInterview from 'features/interviews/presentation/page-sections/ListInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import { Fragment, useMemo } from 'react'
import { STATUS_CANDIDATE } from 'shared/constants/constants'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const showInterview = useMemo(() => {
    return (
      jobApplicationDetail.status === STATUS_CANDIDATE.APPLIED ||
      jobApplicationDetail.status === STATUS_CANDIDATE.INTERVIEWING
    )
  }, [jobApplicationDetail?.status])

  return (
    <DivActionWrapper>
      <DivAction>
        <StepInterview />
      </DivAction>
      <Divider />
      {showInterview && (
        <Fragment>
          <DivAction>
            <ListInterview jobApplicationDetail={jobApplicationDetail} />
          </DivAction>
          <Divider />
        </Fragment>
      )}

      <DivAction>
        <ListFeedBack />
      </DivAction>
    </DivActionWrapper>
  )
}

export default JobDetailAction
