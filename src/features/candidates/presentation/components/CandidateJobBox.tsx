import { Box } from '@mui/material'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkPermissionApplicationHistory from 'features/candidates/permission/utils/checkPermissionApplicationHistory'
import ChipCandidate from 'shared/class/candidate/components/ChipCandidate'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DotIcon from 'shared/components/icons/DotIcon'
import TeamIcon from 'shared/components/icons/Team'
import { Text14sb, Tiny12md } from 'shared/components/Typography'
import { CandidateStatusEnum } from 'shared/schema'
import CandidateJob from 'shared/schema/database/candidate_job'

type CandidateJobBoxProps = {
  actions: TOptionItem<CandidateJob>[]
  candidateJob: CandidateJob
}

function CandidateJobBox({ candidateJob, actions }: CandidateJobBoxProps) {
  const { role, user } = useAuthorization()
  const newActions = checkPermissionApplicationHistory({
    actions,
    me: user,
    role,
    candidateJob,
  })
  return (
    <Box paddingX={2} paddingBottom={2} borderBottom={'1px solid #E3E6EB'}>
      <FlexBox
        marginBottom={1}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ChipCandidate
          status={candidateJob.status as CandidateStatusEnum}
        ></ChipCandidate>
        <ActionGroupButtons<CandidateJob>
          rowId={candidateJob.id}
          actions={newActions}
          rowData={candidateJob}
        />
      </FlexBox>
      <Text14sb marginBottom={1}>{candidateJob.hiring_job.name}</Text14sb>
      <FlexBox
        display="flex"
        flexDirection="row"
        justifyItems="center"
        alignItems="center"
      >
        <TeamIcon
          sx={{
            fontSize: '12px',
            color: '#4D607A',
            marginRight: '4px',
          }}
        />
        <Tiny12md sx={{ marginX: '4px' }}>
          {candidateJob.hiring_job.hiring_team.name}
        </Tiny12md>
        <DotIcon />
        <Tiny12md sx={{ marginX: '4px' }}>
          {candidateJob.hiring_job.location}
        </Tiny12md>
      </FlexBox>
    </Box>
  )
}

export default CandidateJobBox
