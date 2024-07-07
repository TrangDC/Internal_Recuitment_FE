import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { downloadFileAttachment } from 'features/candidatejob/shared/helper'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import LinkIcon from 'shared/components/icons/Link'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import ViewIcon from 'shared/components/icons/View'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { openPDFInNewTab } from 'shared/utils/upload-file'
import { getDomain, handleCopyClipBoard } from 'shared/utils/utils'

enum ActionCandidateJobsTabLe {
  DETAIL = 'detail',
  EDIT_CV = 'edit_cv',
  DELETE = 'delete',
  CHANGE_STATUS = 'change_status',
  COPY_APPLICATION_LINK = 'copy_application_link',
  VIEW_CV = 'view_cv',
  DOWNLOAD = 'download',
}
type UseBuildActionTableCandidateJobsProps = {
  handleOpenEdit: (id: string, rowData: CandidateJob) => void
  handleOpenDelete: (id: string) => void
  handleOpenChangeStatus: (id: string, rowData: CandidateJob) => void
}

function useBuildActionTableCandidateJobs({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenChangeStatus,
}: UseBuildActionTableCandidateJobsProps) {
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<
    ActionCandidateJobsTabLe,
    CandidateJob
  >({
    actions: {
      detail: {
        id: ActionCandidateJobsTabLe.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/job-application-detail/${id}`)
        },
        title: 'Detail',
        Icon: <SearchIconSmall />,
      },
      change_status: {
        id: ActionCandidateJobsTabLe.CHANGE_STATUS,
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
      edit_cv: {
        id: ActionCandidateJobsTabLe.EDIT_CV,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit CV',
        Icon: <EditIcon />,
      },
      copy_application_link: {
        id: ActionCandidateJobsTabLe.COPY_APPLICATION_LINK,
        onClick: (id, rowData) => {
          const url = `${getDomain()}/dashboard/job-application-detail/${id}`
          handleCopyClipBoard(
            url,
            `[APPLICATION] ${rowData.candidate.name}_${rowData.hiring_job.name}`
          )
        },
        title: 'Copy application link',
        Icon: <LinkIcon />,
      },
      view_cv: {
        id: ActionCandidateJobsTabLe.VIEW_CV,
        onClick: (_, rowData) => {
          const attachments = rowData.attachments
          if (attachments?.length > 0) {
            handleGetUrlDownload({
              action: 'DOWNLOAD',
              fileName: attachments[0].document_name ?? '',
              folder: 'candidate',
              id: attachments[0]?.document_id ?? '',
            }).then(async (data) => {
              const urlFile = data?.['CreateAttachmentSASURL']?.url ?? ''
              openPDFInNewTab(urlFile)
            })
          }
        },
        title: 'View CV',
        Icon: <ViewIcon />,
      },
      download: {
        id: ActionCandidateJobsTabLe.DOWNLOAD,
        onClick: (id, rowData) => {
          const { attachments } = rowData
          downloadFileAttachment(attachments, handleGetUrlDownload)
        },
        title: 'Download CV',
        Icon: <DownloadIcon />,
      },
      delete: {
        id: ActionCandidateJobsTabLe.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    },
  })
  return {
    actions,
  }
}

export default useBuildActionTableCandidateJobs
