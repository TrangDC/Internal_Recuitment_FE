import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import { IuseTeamsActionTableReturn } from './useActionTable'
import RecTeam from 'shared/schema/database/rec_team'

export enum ActionsTableTeams {
  DELETE = 'delete',
  EDIT = 'edit',
  CREATE = 'create',
}

function useBuildActionsTableRecTeam({
  handleOpenEdit,
  handleOpenDelete,
}: IuseTeamsActionTableReturn) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const useBuildActionsTableReturn = useBuildActionsTable<
    ActionsTableTeams,
    RecTeam
  >({
    actions: {
      create: {
        id: ActionsTableTeams.CREATE,
        onClick: (id) => {
          // navigate(`/dashboard/team-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionsTableTeams.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionsTableTeams.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })
  return useBuildActionsTableReturn
}

export default useBuildActionsTableRecTeam
