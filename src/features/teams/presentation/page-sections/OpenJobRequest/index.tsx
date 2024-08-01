import FlexBox from 'shared/components/flexbox/FlexBox'
import { columns_job } from '../../../shared/constants/columns'
import { useNavigate, useParams } from 'react-router-dom'
import Add from 'shared/components/icons/Add'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import Cant from 'features/authorization/presentation/components/Cant'
import {
  BoxCircle,
  BtnPrimary,
  DivWrapperProcess,
  SpanGeneration,
  WrapperBox,
} from 'shared/styles'
import useBuildAllJobsActionsTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import {
  CloseJobModal,
  CreateJobModal,
  DeleteJobModal,
  EditJobModal,
} from 'features/jobs/presentation/page-sections'
import { JobStatus } from 'shared/class/job-status'
import { Span } from 'shared/components/Typography'
import { TinyText } from 'shared/components/form/styles'

const { STATUS_HIRING_JOB } = JobStatus
const OpeningJobRequest = () => {
  const { id } = useParams()
  const { useTableReturn } = useJobTable({
    filters: {
      hiring_team_ids: [id],
      status: STATUS_HIRING_JOB.OPENED,
    },
  })
  const { totalRecord } = useTableReturn
  const navigate = useNavigate()

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

  const { actions } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenEdit,
    handleOpenStatus,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns: columns_job,
  })

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <FlexBox gap={1.25}>
          <SpanGeneration sx={{ fontWeight: 500 }}>
            Opening job request
          </SpanGeneration>
          <BoxCircle>
            <TinyText> {totalRecord}</TinyText>
          </BoxCircle>
        </FlexBox>
        <FlexBox gap={1.25} flexWrap={'wrap'}>
          <BtnPrimary onClick={() => navigate('/dashboard/jobs')}>
            <Span>View all</Span>
          </BtnPrimary>
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
