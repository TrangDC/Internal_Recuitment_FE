import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivWrapperProcess, SpanGenaration } from '../../providers/styles'
import CustomTable from 'shared/components/table/CustomTable'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import { columns } from '../../providers/constants/columns'
import { Candidate } from 'features/candidates/domain/interfaces'
import useActionTable from '../../providers/hooks/useActionTable'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate, useParams } from 'react-router-dom'
import useApplyJobTable from '../../providers/hooks/useApplyJobTable'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useTextTranslation from 'shared/constants/text'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadFileAttachment } from '../../providers/helper'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import Add from 'shared/components/icons/Add'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { ApplyJobModal, ChangeStatusModal, DeleteCandidateJobModal } from '../index'

const JobApplicationHistory = ({
  candidateDetail,
}: {
  candidateDetail: Candidate
}) => {
  const {
    openCreate,
    openDelete,
    setOpenDelete,
    setOpenCreate,
    handleOpenChangeStatus,
    handleOpenDelete,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const { id } = useParams()
  const { useTableReturn } = useApplyJobTable(id as string)
  const navigate = useNavigate()

  const { handleGetUrlDownload } = useGetUrlGetAttachment()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/job-application-detail/${id}`)
        },
        title: 'Detail',
        Icon: <SearchIconSmall />,
      },
      {
        id: 'change-status',
        onClick: (id, rowData) => {
          handleOpenChangeStatus(id, rowData)
        },
        title: 'Change status',
        Icon: <EditIcon />,
        disabled: (rowData) => {
          const disabledStatuses = [
            STATUS_CANDIDATE.KIV,
            STATUS_CANDIDATE.OFFERED_LOST,
            STATUS_CANDIDATE.EX_STAFTT,
          ]

          return disabledStatuses.includes(rowData?.status)
        },
      },
      {
        id: 'download',
        onClick: (id, rowData) => {
          const { attachments } = rowData
          downloadFileAttachment(attachments, handleGetUrlDownload)
        },
        title: 'Download CV',
        Icon: <DownloadIcon />,
      },
      {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    ],
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
        <ButtonAdd
          Icon={Add}
          textLable={translation.MODULE_CANDIDATE_JOB.apply_to_a_job}
          onClick={() => setOpenCreate(true)}
        />
      </FlexBox>
      <Box>
        {useTableReturn && (
          <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
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
    </DivWrapperProcess>
  )
}

export default JobApplicationHistory
