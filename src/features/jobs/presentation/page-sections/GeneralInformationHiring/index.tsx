import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import useTextTranslation from 'shared/constants/text'
import useCandidatesByJob from '../../providers/hooks/useCandidatesByJob'
import { DivWrapperProcess, SpanHiring } from '../../providers/styles'
import BoxStatusCandidates from '../BoxStatusCandidates'
import FlexBox from 'shared/components/flexbox/FlexBox'
import BoxTextSquare from 'shared/components/utils/boxText'

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
          />
          <BoxStatusCandidates
            title="Interviewing"
            number_candidates={candidatesStatus?.interviewing?.length}
            list_candidates={candidatesStatus?.interviewing}
          />
          <BoxStatusCandidates
            title="Offering"
            number_candidates={candidatesStatus?.offering?.length}
            list_candidates={candidatesStatus?.offering}
          />
          <BoxStatusCandidates
            title="Hired"
            number_candidates={candidatesStatus?.hired?.length}
            list_candidates={candidatesStatus?.hired}
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
            title="Offerlost"
            number_candidates={candidatesStatus?.offer_lost?.length}
            list_candidates={candidatesStatus?.offer_lost}
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
          />
        </FlexBox>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
