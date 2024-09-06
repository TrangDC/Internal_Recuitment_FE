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
import {
  DeleteJobModal,
} from 'features/jobs/presentation/page-sections'
import { useNavigate, useParams } from 'react-router-dom'
import CloseJobModal from 'features/jobs/presentation/page-sections/CloseJobModal'
import ReopenJobModal from 'features/jobs/presentation/page-sections/ReopenModal'
import CancelModal from 'features/jobs/presentation/page-sections/CancelModal'

const { STATUS_HIRING_JOB } = JobStatus
const OpeningJobRequest = () => {
  const {
    setOpenCreate,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
    rowId,
    openCancel,
    setOpenCancel,
    openReopen,
    setOpenReopen,
    openClose,
    setOpenClose
  } = useActionTable()

  const { id } = useParams()
  const navigate = useNavigate()

  const { useTableReturn } = useJobTable({
    filters: {
      job_position_ids: [id],
      status: STATUS_HIRING_JOB.OPENED,
    },
  })
  const { totalRecord } = useTableReturn

  const { actions } = useAllJobsPermissionActionTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
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
            onClick={() => navigate('/dashboard/add-new-job-request')}
          />
        </Cant>
      </FlexBox>
      <WrapperBox>
        {useTableReturn && (
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        )}
      </WrapperBox>

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
    </DivWrapperProcess>
  )
}

export default OpeningJobRequest
