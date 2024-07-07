import { DivWrapperContainer } from '../../shared/styles'
import { Box, Grid } from '@mui/material'
import JobDetailInformation from '../page-sections/JobDetailInformation'
import JobDetailAction from '../page-sections/JobDetailAction'
import IconScreen from 'shared/components/utils/IconScreen'
import CandidateIcon from 'shared/components/icons/Candidates'
import { useParams } from 'react-router-dom'
import useCandidateJobDetail from '../../hooks/crud/useCandidateJobDetail'

const CandidateJobDetail = () => {
  const { id } = useParams()
  const { jobApplicationDetail } = useCandidateJobDetail(id as string)

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={CandidateIcon}
          textLable={'Job application detail'}
          go_back={true}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <DivWrapperContainer>
          <Grid container>
            <Grid item width={220}>
              <JobDetailInformation
                jobApplicationDetail={jobApplicationDetail}
              />
            </Grid>
            <Grid item flex={1}>
              <JobDetailAction jobApplicationDetail={jobApplicationDetail} />
            </Grid>
          </Grid>
        </DivWrapperContainer>
      </Box>
    </Box>
  )
}

export default CandidateJobDetail
