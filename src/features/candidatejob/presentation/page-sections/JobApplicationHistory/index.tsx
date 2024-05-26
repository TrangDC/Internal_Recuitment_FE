import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import {
  ButtonHeader,
  DivWrapperProcess,
  SpanGenaration,
} from '../../providers/styles'
import CustomTable from 'shared/components/table/CustomTable'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import { columns } from '../../providers/constants/columns'
import { Candidate, CandidateJob } from 'features/candidates/domain/interfaces'
import useActionTable from '../../providers/hooks/useActionTable'
import EditIcon from 'shared/components/icons/EditIcon'
import ApplyJobModal from '../ApplyJobModal'
import { useNavigate, useParams } from 'react-router-dom'
import useApplyJobTable from '../../providers/hooks/useApplyJobTable'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useTextTranslation from 'shared/constants/text'
import ChangeStatusModal from '../ChangeStatusModal'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadFileAttachment } from '../../providers/helper'
import { useMemo } from 'react'
import { STATUS_CANDIDATE } from 'shared/constants/constants'

const JobApplicationHistory = ({candidateDetail}: {candidateDetail: Candidate}) => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const { id } = useParams()
  const { useTableReturn } = useApplyJobTable(id as string)
  const navigate = useNavigate()

  const { handleGetUrlDownload } = useGetUrlGetAttachment()

  const disabledChangeStatus = useMemo(() => {
    const disabledStatuses = [
      STATUS_CANDIDATE.KIV,
      STATUS_CANDIDATE.OFFERED_LOST,
      STATUS_CANDIDATE.EX_STAFTT
    ];

    return disabledStatuses.includes(candidateDetail?.status);
  }, [candidateDetail?.status])

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id, rowData) => {
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
        disabled: disabledChangeStatus,
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
    ],
    columns,
  })

  const translation = useTextTranslation()

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'}>
        <SpanGenaration>
          {translation.MODULE_CANDIDATE_JOB.job_application_history}
        </SpanGenaration>
        <ButtonHeader
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreate(true)}
        >
          {translation.MODULE_CANDIDATE_JOB.apply_to_a_job}
        </ButtonHeader>
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
        />
      )}
    </DivWrapperProcess>
  )
}

export default JobApplicationHistory
