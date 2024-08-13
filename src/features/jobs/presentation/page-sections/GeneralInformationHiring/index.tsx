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
import { ENUM_STATUS_CANDIDATE } from 'shared/constants/constants'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { useState } from 'react'
import CollapseLeftIcon from 'shared/components/icons/CollapseLeftIcon'
import CollapseRightIcon from 'shared/components/icons/CollapseRightIcon'

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
                status={ENUM_STATUS_CANDIDATE.APPLIED}
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Interviewing"
                number_candidates={candidatesStatus?.interviewing?.length}
                list_candidates={candidatesStatus?.interviewing}
                status={ENUM_STATUS_CANDIDATE.INTERVIEWING}
              />
            </BoxHiringProcess>

            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Offering"
                number_candidates={candidatesStatus?.offering?.length}
                list_candidates={candidatesStatus?.offering}
                status={ENUM_STATUS_CANDIDATE.OFFERING}
              />
            </BoxHiringProcess>
            <BoxHiringProcess>
              <BoxStatusCandidates
                title="Hired"
                number_candidates={candidatesStatus?.hired?.length}
                list_candidates={candidatesStatus?.hired}
                status={ENUM_STATUS_CANDIDATE.HIRED}
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
                title="KIV"
                number_candidates={candidatesStatus?.kiv?.length}
                list_candidates={candidatesStatus?.kiv}
                status={ENUM_STATUS_CANDIDATE.KIV}
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
                status={ENUM_STATUS_CANDIDATE.OFFERED_LOST}
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
                status={ENUM_STATUS_CANDIDATE.EX_STAFTT}
              />
            </BoxHiringProcess>
          </FlexBox>
        </Scrollbar>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
