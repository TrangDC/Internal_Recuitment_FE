import { Divider } from '@mui/material'
import { DivAction, DivItemInformation } from '../../../shared/styles'
import StepInterview from 'features/interviews/presentation/page-sections/StepInterview'
import ListFeedBack from 'features/feedback/presentation/page-sections/ListFeedback'
import { Fragment, useEffect, useMemo, useState } from 'react'
import useGetCandidateJobInterview from '../../../hooks/crud/useGetCandidateJobInterview'
import { useParams } from 'react-router-dom'
import { ListInterview } from 'features/interviews/presentation/page-sections'
import Cant from 'features/authorization/presentation/components/Cant'
import CandidateJob from 'shared/schema/database/candidate_job'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

const JobDetailAction = ({
  jobApplicationDetail,
}: {
  jobApplicationDetail: CandidateJob
}) => {
  const { id } = useParams()
  const [statusSelected, setStatusSelected] = useState<string>()
  const { candidateJobInterview } = useGetCandidateJobInterview(id as string)

  useEffect(() => {
    jobApplicationDetail?.status &&
      setStatusSelected(jobApplicationDetail?.status)
  }, [jobApplicationDetail?.status])

  const show_feedback = useMemo(() => {
    const stepsLength = jobApplicationDetail?.steps?.length - 1
    const max_step = jobApplicationDetail?.steps?.[stepsLength]
    return max_step?.candidate_job_status === statusSelected
  }, [jobApplicationDetail, statusSelected])

  const show_interview = useMemo(() => {
    return statusSelected === application_data.interviewing.value && jobApplicationDetail.status === application_data.interviewing.value;
  }, [jobApplicationDetail, statusSelected])

  return (
    <DivItemInformation>
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
              listInterview={candidateJobInterview.interview ?? []}
              show_interview={show_interview}
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
            listFeedback={candidateJobInterview.feedback ?? []}
            show_feedback={show_feedback}
          />
        </Cant>
      </DivAction>
    </DivItemInformation>
  )
}

export default JobDetailAction
