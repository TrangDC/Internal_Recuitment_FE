import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import { IuseTeamsActionTableReturn } from './useActionTable'
import RecTeam from 'shared/schema/database/rec_team'

export enum ActionsTableRecTeams {
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
    ActionsTableRecTeams,
    RecTeam
  >({
    actions: {
      create: {
        id: ActionsTableRecTeams.CREATE,
        onClick: (id) => {
          navigate(`/dashboard/rec-team-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionsTableRecTeams.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionsTableRecTeams.DELETE,
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
