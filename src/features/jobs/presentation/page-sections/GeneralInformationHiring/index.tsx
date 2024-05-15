import { Box, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import useTextTranslation from 'shared/constants/text'
import useCandidatesByJob from '../../providers/hooks/useCandidatesByJob'
import {
  DivWrapperProcess,
  SpanHiring,
} from '../../providers/styles'
import BoxStatusCandidates from '../BoxStatusCandidates'

const GenaralInformationHiring = () => {
  const translation = useTextTranslation()
  const { id } = useParams()
  const { candidatesStatus } = useCandidatesByJob(id as string)

  return (
    <DivWrapperProcess flexDirection={'column'} gap={'10px'}>
      <Box>
        <SpanHiring>{translation.MODLUE_JOBS.hiring_process}</SpanHiring>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Application"
              number_candidates={candidatesStatus?.applied?.length}
              list_candidates={candidatesStatus?.applied}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Interviewing"
              number_candidates={candidatesStatus?.interviewing?.length}
              list_candidates={candidatesStatus?.interviewing}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Offering"
              number_candidates={candidatesStatus?.offering?.length}
              list_candidates={candidatesStatus?.offering}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Hired"
              number_candidates={candidatesStatus?.hired?.length}
              list_candidates={candidatesStatus?.hired}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="KIV"
              number_candidates={candidatesStatus?.kiv?.length}
              list_candidates={candidatesStatus?.kiv}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Offerlost"
              number_candidates={candidatesStatus?.offer_lost?.length}
              list_candidates={candidatesStatus?.offer_lost}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <BoxStatusCandidates
              title="Ex-staff"
              number_candidates={candidatesStatus?.ex_staff?.length}
              list_candidates={candidatesStatus?.ex_staff}
            />
          </Grid>
        </Grid>
      </Box>
    </DivWrapperProcess>
  )
}

export default GenaralInformationHiring
