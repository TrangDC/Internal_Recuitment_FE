import { Box } from '@mui/system'
import { BoxWrapperOuterContainer } from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { Fragment } from 'react/jsx-runtime'
import CreateJobModal from '../../CreateJobModal'
import EditJobModal from '../../EditJobModal'
import DeleteJobModal from '../../DeleteJobModal'
import { CloseJobModal } from '../..'
import { columns } from 'features/jobs/shared/constants/columns'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { useMemo } from 'react'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import useAllJobsPermissionActionTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'

const AllJobOpening = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    rowId,
    setOpenEdit,
  } = useActionTable()

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
      team_ids: dataFilterWithValue.team_id,
      status: 'opened',
    }
  }, [JSON.stringify(dataFilterWithValue)])

  const { useTableReturn } = useJobTable({
    filters: filter_value,
    search: search,
  })

  const { actions } = useAllJobsPermissionActionTable({
    handleOpenDelete,
    handleOpenEdit,
    handleOpenStatus,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns,
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

      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}

      {openStatus && (
        <CloseJobModal
          open={openStatus}
          setOpen={setOpenStatus}
          id={rowId.current}
        />
      )}
    </Fragment>
  )
}

export default AllJobOpening
