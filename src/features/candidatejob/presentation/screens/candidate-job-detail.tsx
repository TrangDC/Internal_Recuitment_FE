import { DivContainerWrapper } from '../providers/styles'
import {
  Box,
  Grid,
  styled,
} from '@mui/material'
import JobDetailInformation from '../page-sections/JobDetailInformation'
import JobDetailAction from '../page-sections/JobDetailAction'
import IconScreen from 'shared/components/utils/IconScreen'
import CandidateIcon from 'shared/components/icons/Candidates'
import { useParams } from 'react-router-dom'
import useCandidateJobDetail from '../providers/hooks/useCandidateJobDetail'

const DivWrapperContainer = styled(DivContainerWrapper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  borderRadius: '8px',
}))

const CandidateJobDetail = () => {
  const { id } = useParams();
  const { jobApplicationDetail } = useCandidateJobDetail(id as string);

  return (
    <Box pt={2} pb={4}>
     <Box>
        <IconScreen Icon={CandidateIcon} textLable={'Job application detail'} />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <DivWrapperContainer>
          <Grid container>
            <Grid item xs={3}>
              <JobDetailInformation candidate={jobApplicationDetail.candidate} job={jobApplicationDetail.hiring_job_id}/>
            </Grid>
            <Grid item xs={9}>
              <JobDetailAction />
            </Grid>
          </Grid>
        </DivWrapperContainer>
      </Box>
    </Box>
  )
}

export default CandidateJobDetail
