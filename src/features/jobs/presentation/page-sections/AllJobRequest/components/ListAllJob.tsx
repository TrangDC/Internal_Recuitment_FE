import { Box } from '@mui/system'
import { BoxWrapperOuterContainer } from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { Fragment } from 'react/jsx-runtime'
import DeleteJobModal from '../../DeleteJobModal'
import { columns } from 'features/jobs/shared/constants/columns'
import { useContextKanbanJob } from '../context/KanbanJobContext'
import { useMemo } from 'react'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import useAllJobsPermissionActionTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import CloseJobModal from '../../CloseJobModal'
import ReopenJobModal from '../../ReopenModal'
import CancelModal from '../../CancelModal'
import { REC_IN_CHARGE_STATE } from 'shared/components/autocomplete/rec-in-charge-auto-complete/hooks/useRecInCharge'
import { isEmpty } from 'lodash'

const ListAllJob = () => {
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openReopen,
    setOpenReopen,
    handleOpenReopen,
    openCancel,
    setOpenCancel,
    handleOpenCancel,
    openClose,
    setOpenClose,
    handleOpenClose,
    rowId,
  } = useActionTable()

  const { action_filter } = useContextKanbanJob()
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { search } = useSearchListReturn
  const { dataFilterWithValue } = useFilterReturn

  const recInChargeIds =
    Array.isArray(dataFilterWithValue.rec_in_charge_ids) &&
    !isEmpty(dataFilterWithValue.rec_in_charge_ids)
      ? dataFilterWithValue.rec_in_charge_ids.filter(
          (recInCharge) => recInCharge !== REC_IN_CHARGE_STATE.unassigned
        )
      : undefined

  const filter_value = useMemo(() => {
    return {
      created_by_ids: dataFilterWithValue.created_by_ids,
      location: dataFilterWithValue.location,
      priorities: dataFilterWithValue.priorities,
      skill_ids: dataFilterWithValue.skill_ids,
      hiring_team_ids: dataFilterWithValue.hiring_team_ids,
      rec_team_ids: dataFilterWithValue.rec_team_ids,
      unassigned: dataFilterWithValue?.unassigned,
      rec_in_charge_ids: recInChargeIds,
    }
  }, [JSON.stringify(dataFilterWithValue)])

  const { useTableReturn } = useJobTable({
    filters: filter_value,
    search: search,
  })

  const { actions } = useAllJobsPermissionActionTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns: columns,
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

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}

      {openClose && (
        <CloseJobModal
          open={openClose}
          setOpen={setOpenClose}
          id={rowId.current}
        />
      )}

      {openReopen && (
        <ReopenJobModal
          open={openReopen}
          setOpen={setOpenReopen}
          id={rowId.current}
        />
      )}

      {openCancel && (
        <CancelModal
          open={openCancel}
          setOpen={setOpenCancel}
          id={rowId.current}
        />
      )}
    </Fragment>
  )
}

export default ListAllJob
