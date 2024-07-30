import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import RemoveBlackListIcon from 'shared/components/icons/RemoveBlackListIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import Candidate from 'shared/schema/database/candidate'

export enum ActionCandidateTableBL {
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
  REMOVE_BLACK_LIST = 'remove_black_list',
}

type UseBuildActionTableCandidateBLProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenBlackList: (id: string) => void
}

function useBuildActionTableCandidateBL({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenBlackList,
}: UseBuildActionTableCandidateBLProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<ActionCandidateTableBL, Candidate>({
    actions: {
      detail: {
        id: ActionCandidateTableBL.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/candidate-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionCandidateTableBL.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      remove_black_list: {
        id: ActionCandidateTableBL.REMOVE_BLACK_LIST,
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: 'Remove from blacklist',
        Icon: <RemoveBlackListIcon />,
      },
      delete: {
        id: ActionCandidateTableBL.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })
  return {
    actions,
  }
}

export default useBuildActionTableCandidateBL
