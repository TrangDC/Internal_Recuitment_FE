import FlexBox from 'shared/components/flexbox/FlexBox'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import Cant from 'features/authorization/presentation/components/Cant'
import {
  DivWrapperProcess,
  SpanGenaration,
} from 'features/job-position/shared/constants/styles/style'
import Add from 'shared/components/icons/Add'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { columns_job_request as columns } from 'features/job-position/shared/constants/columns'
import useAllJobsPermissionActionTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import { BoxCircle, WrapperBox } from 'shared/styles'
import { TinyText } from 'shared/components/form/styles'
import { JobStatus } from 'shared/class/job-status'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import { CloseJobModal, CreateJobModal, DeleteJobModal, EditJobModal } from 'features/jobs/presentation/page-sections'

const { STATUS_HIRING_JOB } = JobStatus
const OpeningJobRequest = () => {
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

  const { useTableReturn } = useJobTable({
    filters: {
      // hiring_team_ids: [id],
      status: STATUS_HIRING_JOB.OPENED,
    },
  })
  const { totalRecord } = useTableReturn

  const { actions } = useAllJobsPermissionActionTable({
    handleOpenDelete,
    handleOpenEdit,
    handleOpenStatus,
  })
  const { columnTable } = useBuildColumnTable({
    actions: actions,
    columns,
  })

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <FlexBox gap={1.25}>
          <SpanGenaration sx={{ fontWeight: 500 }}>
            Opening job request
          </SpanGenaration>
          <BoxCircle>
            <TinyText>{totalRecord}</TinyText>
          </BoxCircle>
        </FlexBox>
        <Cant
          module="CANDIDATE_JOBS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['CREATE.everything', 'CREATE.teamOnly'],
          }}
        >
          <ButtonAdd
            Icon={Add}
            textLable="Add a new request"
              onClick={() => setOpenCreate(true)}
          />
        </Cant>
      </FlexBox>
      <WrapperBox>
        {useTableReturn && (
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        )}
      </WrapperBox>

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
    </DivWrapperProcess>
  )
}

export default OpeningJobRequest
