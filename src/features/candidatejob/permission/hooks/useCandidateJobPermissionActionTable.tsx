import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { downloadFileAttachment } from 'features/candidatejob/presentation/providers/helper'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import LinkIcon from 'shared/components/icons/Link'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import ViewIcon from 'shared/components/icons/View'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import useTextTranslation from 'shared/constants/text'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { openPDFInNewTab } from 'shared/utils/upload-file'
import { getDomain, handleCopyClipBoard } from 'shared/utils/utils'

type IActionCandidateJobs =
  | 'detail'
  | 'edit-cv'
  | 'delete'
  | 'change_status'
  | 'copy-application-link'
  | 'view-cv'
  | 'download'

type UseCandidateJobPermissionActionTableProps = {
  handleOpenEdit: (id: string, rowData: CandidateJob) => void
  handleOpenDelete: (id: string) => void
  handleOpenChangeStatus: (id: string, rowData: CandidateJob) => void
}

function useCandidateJobPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenChangeStatus,
}: UseCandidateJobPermissionActionTableProps) {
  const translation = useTextTranslation()
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  const navigate = useNavigate()
  const { actions } = usePermissionActionTable<
    IActionCandidateJobs,
    CandidateJob
  >({
    actions: {
      detail: {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/job-application-detail/${id}`)
        },
        title: 'Detail',
        Icon: <SearchIconSmall />,
      },
      change_status: {
        id: 'change_status',
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
      'edit-cv': {
        id: 'edit-cv',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit CV',
        Icon: <EditIcon />,
      },
      'copy-application-link': {
        id: 'copy-application-link',
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
      'view-cv': {
        id: 'view-cv',
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
        id: 'download',
        onClick: (id, rowData) => {
          const { attachments } = rowData
          downloadFileAttachment(attachments, handleGetUrlDownload)
        },
        title: 'Download CV',
        Icon: <DownloadIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    },
    permissionActions: ({ actions, role }, utils) => {
      let newActions = [...actions]
      const cantView = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['VIEW.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })

      const cantChangeStatus = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['CHANGE_STATUS.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })
      if (!cantView)
        newActions = utils.removeAction(newActions, [
          'detail',
          'download',
          'view-cv',
          'copy-application-link',
        ])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit-cv'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      if (!cantChangeStatus)
        newActions = utils.removeAction(newActions, ['change_status'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useCandidateJobPermissionActionTable
