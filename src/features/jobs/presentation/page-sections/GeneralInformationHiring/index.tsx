import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import useTextTranslation from 'shared/constants/text'
import useCandidatesByJob from '../../providers/hooks/useCandidatesByJob'
import { DivWrapperProcess, SpanHiring } from '../../providers/styles'
import BoxStatusCandidates from '../BoxStatusCandidates'
import FlexBox from 'shared/components/flexbox/FlexBox'
import BoxTextSquare from 'shared/components/utils/boxText'
import { ENUM_STATUS_CANDIDATE } from 'shared/constants/constants'

const GenaralInformationHiring = () => {
  const translation = useTextTranslation()
  const { id } = useParams()
  const { candidatesStatus } = useCandidatesByJob(id as string)

  return (
    <DivWrapperProcess flexDirection={'column'} gap={'10px'} sx={{padding: 0}}>
      <Box>
        <SpanHiring>{translation.MODLUE_JOBS.hiring_process}</SpanHiring>
      </Box>
      <Box>
        <FlexBox gap={'10px'} flexWrap={'wrap'}>
          <BoxStatusCandidates
            title="Application"
            number_candidates={candidatesStatus?.applied?.length}
            list_candidates={candidatesStatus?.applied}
            status={ENUM_STATUS_CANDIDATE.APPLIED}
          />
          <BoxStatusCandidates
            title="Interviewing"
            number_candidates={candidatesStatus?.interviewing?.length}
            list_candidates={candidatesStatus?.interviewing}
            status={ENUM_STATUS_CANDIDATE.INTERVIEWING}
          />
          <BoxStatusCandidates
            title="Offering"
            number_candidates={candidatesStatus?.offering?.length}
            list_candidates={candidatesStatus?.offering}
            status={ENUM_STATUS_CANDIDATE.OFFERING}
          />
          <BoxStatusCandidates
            title="Hired"
            number_candidates={candidatesStatus?.hired?.length}
            list_candidates={candidatesStatus?.hired}
            status={ENUM_STATUS_CANDIDATE.HIRED}
            Note={ <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#D4FCEC',
                  color: '#20A4A9',
                },
              }}
              content="Success"
            />}
          />
          <BoxStatusCandidates
            title="KIV"
            number_candidates={candidatesStatus?.kiv?.length}
            list_candidates={candidatesStatus?.kiv}
            status={ENUM_STATUS_CANDIDATE.KIV}
            Note={ <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#FFE4E1',
                  color: '#DB4E82',
                },
              }}
              content="Failed"
            />}
          />
          <BoxStatusCandidates
            title="Offer-lost"
            number_candidates={candidatesStatus?.offer_lost?.length}
            list_candidates={candidatesStatus?.offer_lost}
            status={ENUM_STATUS_CANDIDATE.OFFERED_LOST}
            Note={ <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#FFE4E1',
                  color: '#DB4E82',
                },
              }}
              content="Failed"
            />}
          />

          <BoxStatusCandidates
            title="Ex-staff"
            number_candidates={candidatesStatus?.ex_staff?.length}
            list_candidates={candidatesStatus?.ex_staff}
            status={ENUM_STATUS_CANDIDATE.EX_STAFTT}
          />
        </FlexBox>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
