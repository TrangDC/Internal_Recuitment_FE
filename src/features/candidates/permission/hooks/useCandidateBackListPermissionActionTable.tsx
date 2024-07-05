import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import RemoveBlackListIcon from 'shared/components/icons/RemoveBlackListIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'

type IActionJobsOpen = 'detail' | 'edit' | 'delete' | 'remove-black-list'

type UseCandidateBackListPermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenBlackList: (id: string) => void
}

function useCandidateBackListPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenBlackList,
}: UseCandidateBackListPermissionActionTableProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = usePermissionActionTable<IActionJobsOpen, Candidate>({
    actions: {
      detail: {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/candidate-detail/${id}`)
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
      'remove-black-list': {
        id: 'remove-black-list',
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: 'Remove from blacklist',
        Icon: <RemoveBlackListIcon />,
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
        module: 'CANDIDATES',
        role: role,
      })

      const cantAddRemoveBlackList = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['ADD_REMOVE_BLACK_LIST.everything'],
        },
        module: 'CANDIDATES',
        role: role,
      })

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'CANDIDATES',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'CANDIDATES',
        role: role,
      })
      if (!cantView) newActions = utils.removeAction(newActions, ['detail'])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      if (!cantAddRemoveBlackList)
        newActions = utils.removeAction(newActions, ['remove-black-list'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useCandidateBackListPermissionActionTable
