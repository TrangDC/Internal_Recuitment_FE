import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text15sb } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import Scrollbar from 'shared/components/ScrollBar'
import { ContainerRight } from '../../components/Container'
import AppButton from 'shared/components/buttons/AppButton'
import CandidateJobBox from '../../components/CandidateJobBox'
import { useParams } from 'react-router-dom'
import useGetAllCandidateJob from 'features/candidates/hooks/application-history/useGetAllCandidateJob'
import useActionApplicationHistory from 'features/candidates/hooks/application-history/useActionApplicationHistory'
import useBuildActionApplicationHistory from 'features/candidates/hooks/application-history/useBuildActionApplicationHistory'
import {
  ApplyJobModal,
  ChangeStatusModal,
  DeleteCandidateJobModal,
} from 'features/candidatejob/presentation/page-sections'
import EditCandidateJobModal from 'features/candidatejob/presentation/page-sections/EditCandidateJobModal'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { useCandidateInforContext } from 'features/candidates/shared/context/CandidateInformation'
import { CandidateStatusEnum } from 'shared/schema'

const ApplicationHistory = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { candidateInfor } = useCandidateInforContext()
  const { candidateJobs } = useGetAllCandidateJob(id)
  const {
    handleOpenChangeStatus,
    handleOpenDelete,
    handleOpenEdit,
    openChangeStatus,
    openCreate,
    openDelete,
    openEdit,
    rowData,
    rowId,
    setOpenChangeStatus,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
  } = useActionApplicationHistory()
  const { actions } = useBuildActionApplicationHistory({
    handleOpenChangeStatus,
    handleOpenDelete,
    handleOpenEdit,
  })

  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE, MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
  }

  return (
    <ContainerRight>
      <FlexBox
        sx={{
          width: '100%',
          borderBottom: '1px solid #e3e6eb',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '16px',
          height: '100px',
        }}
      >
        <Text15sb
          sx={{
            fontWeight: 500,
            color: '#00508A',
            marginBottom: '16px',
          }}
        >
          Application history
        </Text15sb>
        <AppButton
          startIcon={<Add />}
          variant="contained"
          onClick={() => setOpenCreate(true)}
        >
          Apply to a job request
        </AppButton>
      </FlexBox>
      <Box flexGrow={1} height={'calc(80vh - 100px)'}>
        <Scrollbar>
          {candidateJobs.map((candidateJob) => (
            <CandidateJobBox
              key={candidateJob.id}
              actions={actions}
              candidateJob={candidateJob}
            />
          ))}
        </Scrollbar>
      </Box>
      {openCreate && (
        <ApplyJobModal
          open={openCreate}
          setOpen={setOpenCreate}
          candidateId={id as string}
          onSuccess={handleRefreshList}
        />
      )}
      {openChangeStatus && (
        <ChangeStatusModal
          open={openChangeStatus}
          setOpen={setOpenChangeStatus}
          candidateId={id as string}
          id={rowId.current}
          rowData={rowData.current}
          statusCurrent={rowData.current?.status as CandidateStatusEnum}
          onSuccess={handleRefreshList}
        />
      )}
      {openDelete && (
        <DeleteCandidateJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
      {openEdit && (
        <EditCandidateJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          candidateId={rowId.current}
          onSuccess={handleRefreshList}
        />
      )}
    </ContainerRight>
  )
}

export default ApplicationHistory
