import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivWrapperProcess, SpanGenaration } from '../../../shared/styles'
import { columns } from '../../../shared/constants/columns'
import { Candidate } from 'features/candidates/domain/interfaces'
import useActionTable from '../../../hooks/table/useActionTable'
import { useParams } from 'react-router-dom'
import useApplyJobTable from '../../../hooks/table/useApplyJobTable'
import useTextTranslation from 'shared/constants/text'
import Add from 'shared/components/icons/Add'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import {
  ApplyJobModal,
  ChangeStatusModal,
  DeleteCandidateJobModal,
} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import EditCandidateJobModal from '../EditCandidateJobModal'
import Cant from 'features/authorization/presentation/components/Cant'
import useBuildActionTableCandidateJobs from '../../../hooks/table/useBuildActionTableCandidateJobs'

const JobApplicationHistory = ({
  candidateDetail,
}: {
  candidateDetail: Candidate
}) => {
  const {
    rowId,
    rowData,
    openEdit,
    openCreate,
    openDelete,
    openChangeStatus,
    setOpenEdit,
    setOpenDelete,
    setOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    setOpenChangeStatus,
    handleOpenChangeStatus,
  } = useActionTable<CandidateJob>()

  const { id } = useParams()
  const { useTableReturn } = useApplyJobTable({
    filters: { candidate_id: id },
  })

  const { actions } = useBuildActionTableCandidateJobs({
    handleOpenChangeStatus,
    handleOpenDelete,
    handleOpenEdit,
  })
  const { columnTable } = useBuildColumnTable({
    actions: actions,
    columns,
  })

  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE, MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
  }

  const translation = useTextTranslation()

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <SpanGenaration sx={{ fontWeight: 500 }}>
          {translation.MODULE_CANDIDATE_JOB.job_application_history}
        </SpanGenaration>
        <Cant
          module="CANDIDATE_JOBS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['CREATE.everything', 'CREATE.teamOnly'],
          }}
        >
          <ButtonAdd
            Icon={Add}
            textLable={translation.MODULE_CANDIDATE_JOB.apply_to_a_job}
            onClick={() => setOpenCreate(true)}
          />
        </Cant>
      </FlexBox>
      <Box>
        {useTableReturn && (
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        )}
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
          statusCurrent={candidateDetail?.status}
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
    </DivWrapperProcess>
  )
}

export default JobApplicationHistory
