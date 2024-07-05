import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { IActionTeams, Team } from 'features/teams/domain/interfaces'
import { IuseTeamsActionTableReturn } from 'features/teams/hooks/useActionTable'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'

function useTeamsPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
}: IuseTeamsActionTableReturn) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = usePermissionActionTable<IActionTeams, Team>({
    actions: {
      create: {
        id: 'create',
        onClick: (id) => {
          navigate(`/dashboard/team-detail/${id}`)
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
      const cantCreate = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['CREATE.everything'],
        },
        module: 'TEAMS',
        role: role,
      })
      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything', 'EDIT.ownedOnly', 'EDIT.teamOnly'],
        },
        module: 'TEAMS',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'TEAMS',
        role: role,
      })
      if (!cantCreate) newActions = utils.removeAction(newActions, ['create'])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useTeamsPermissionActionTable
