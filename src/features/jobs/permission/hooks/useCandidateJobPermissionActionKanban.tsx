import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { CandidateStatusItem, Job } from 'features/jobs/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'

type IActionJobsOpen = 'detail' | 'edit' | 'delete'

type UseCandidateJobPermissionActionKanbanProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
}

function useCandidateJobPermissionActionKanban({
  handleOpenEdit,
  handleOpenDelete,
}: UseCandidateJobPermissionActionKanbanProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = usePermissionActionTable<
    IActionJobsOpen,
    CandidateStatusItem
  >({
    actions: {
      detail: {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/job-application-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
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

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['VIEW.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['VIEW.everything'],
        },
        module: 'CANDIDATE_JOBS',
        role: role,
      })
      if (!cantView) newActions = utils.removeAction(newActions, ['detail'])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useCandidateJobPermissionActionKanban
