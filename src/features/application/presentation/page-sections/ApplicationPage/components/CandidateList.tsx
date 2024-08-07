import { Box } from '@mui/system'
import { BoxWrapperOuterContainer } from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { Fragment } from 'react/jsx-runtime'
import { columns_candidate_job } from 'features/application/shared/constants/columns'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { useMemo } from 'react'
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import CandidateJob from 'shared/schema/database/candidate_job'
import useBuildActionTableCandidateJobs from 'features/candidatejob/hooks/table/useBuildActionTableCandidateJobs'
import useApplyJobTable from 'features/candidatejob/hooks/table/useApplyJobTable'
import { ChangeStatusModal, DeleteCandidateJobModal } from 'features/candidatejob/presentation/page-sections'
import EditCandidateJobModal from 'features/candidatejob/presentation/page-sections/EditCandidateJobModal'
import { CandidateStatusEnum } from 'shared/schema'

const CandidateList = () => {
  const {
    rowId,
    rowData,
    openEdit,
    openDelete,
    openChangeStatus,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    setOpenChangeStatus,
    handleOpenChangeStatus,
  } = useActionTable<CandidateJob>()

  const { action_filter } = useContextChangeStatus()
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { search } = useSearchListReturn
  const { dataFilterWithValue } = useFilterReturn

  const filter_value = useMemo(() => {
    return {
      created_by_ids: dataFilterWithValue.created_by_ids,
      location: dataFilterWithValue.location,
      priority: dataFilterWithValue.priority,
      skill_ids: dataFilterWithValue.skill_id,
      hiring_team_ids: dataFilterWithValue.hiring_team_ids,
      status: 'opened',
    }
  }, [JSON.stringify(dataFilterWithValue)])

  const { useTableReturn } = useApplyJobTable({
    filters: { candidate_id: 'c3d5b3e3-ba75-46ff-ac90-afb3c446351b' },
  })

  const { actions } = useBuildActionTableCandidateJobs({
    handleOpenChangeStatus,
    handleOpenDelete,
    handleOpenEdit,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns: columns_candidate_job,
  })

  return (
    <Fragment>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={columnTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>
      {openChangeStatus && (
        <ChangeStatusModal
          open={openChangeStatus}
          setOpen={setOpenChangeStatus}
          candidateId={rowData?.current?.id as string}
          id={rowId.current}
          rowData={rowData.current}
          statusCurrent={rowData?.current?.status as CandidateStatusEnum}
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
        />
      )}
    </Fragment>
  )
}

export default CandidateList
