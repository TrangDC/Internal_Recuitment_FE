import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import useTextTranslation from 'shared/constants/text'
import useCandidatesByJob from '../../../hooks/crud/useCandidatesByJob'
import {
  BoxContainerCandidate,
  BoxHiringProcess,
  DivWrapperProcess,
  SpanHiring,
} from '../../../shared/styles'
import BoxStatusCandidates from '../BoxStatusCandidates'
import BoxTextSquare from 'shared/components/utils/boxText'
// import { ENUM_STATUS_CANDIDATE } from 'shared/constants/constants'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { useState } from 'react'
import CollapseLeftIcon from 'shared/components/icons/CollapseLeftIcon'
import CollapseRightIcon from 'shared/components/icons/CollapseRightIcon'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'
import { CandidateStatusEnum } from 'shared/schema'

const GenaralInformationHiring = () => {
  const translation = useTextTranslation()
  const { id } = useParams()
  const { candidatesStatus } = useCandidatesByJob(id as string)
  return (
    <DivWrapperProcess
      flexDirection={'column'}
      gap={'10px'}
      sx={{ padding: 0 }}
    >
      <Box>
        <SpanHiring>{translation.MODLUE_JOBS.hiring_process}</SpanHiring>
      </Box>
      <Box>
        <Scrollbar>
          <FlexBox
            gap={2}
            sx={{
              minWidth: '1200px',
            }}
          >
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Applied"
                number_candidates={candidatesStatus?.applied?.length}
                list_candidates={candidatesStatus?.applied}
                status={application_data.applied.value as CandidateStatusEnum}
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Interviewing"
                number_candidates={candidatesStatus?.interviewing?.length}
                list_candidates={candidatesStatus?.interviewing}
                status={application_data.interviewing.value as CandidateStatusEnum}
              />
            </BoxHiringProcess>

            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Offering"
                number_candidates={candidatesStatus?.offering?.length}
                list_candidates={candidatesStatus?.offering}
                status={application_data.offering.value as CandidateStatusEnum}
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Hired"
                number_candidates={candidatesStatus?.hired?.length}
                list_candidates={candidatesStatus?.hired}
                status={application_data.hired.value as CandidateStatusEnum}
                Note={
                  <BoxTextSquare
                    boxProps={{
                      sx: {
                        background: '#D4FCEC',
                        color: '#20A4A9',
                      },
                    }}
                    content="Success"
                  />
                }
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Failed CV"
                number_candidates={candidatesStatus?.failed_cv?.length}
                list_candidates={candidatesStatus?.failed_cv}
                status={application_data.failed_cv.value as CandidateStatusEnum}
                Note={
                  <BoxTextSquare
                    boxProps={{
                      sx: {
                        background: '#FFE4E1',
                        color: '#DB4E82',
                      },
                    }}
                    content="Failed"
                  />
                }
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Failed Interview"
                number_candidates={candidatesStatus?.failed_interview?.length}
                list_candidates={candidatesStatus?.failed_interview}
                status={application_data.failed_cv.value as CandidateStatusEnum}
                Note={
                  <BoxTextSquare
                    boxProps={{
                      sx: {
                        background: '#FFE4E1',
                        color: '#DB4E82',
                      },
                    }}
                    content="Failed"
                  />
                }
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Offered lost"
                number_candidates={candidatesStatus?.offer_lost?.length}
                list_candidates={candidatesStatus?.offer_lost}
                status={application_data.offer_lost.value as CandidateStatusEnum}
                Note={
                  <BoxTextSquare
                    boxProps={{
                      sx: {
                        background: '#FFE4E1',
                        color: '#DB4E82',
                      },
                    }}
                    content="Failed"
                  />
                }
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Ex-staff"
                number_candidates={candidatesStatus?.ex_staff?.length}
                list_candidates={candidatesStatus?.ex_staff}
                status={application_data.ex_staff.value as CandidateStatusEnum}
              />
            </BoxHiringProcess>
          </FlexBox>
        </Scrollbar>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
