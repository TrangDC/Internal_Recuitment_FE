import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'

export enum ActionHistoryCall {
  EDIT = 'edit',
  DELETE = 'delete',
  VIEW = 'view',
}
type UseBuildActionHistoryCallProps = {
  handleOpenEdit: (id: string, rowData: CandidateHistoryCall) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useBuildActionHistoryCall({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseBuildActionHistoryCallProps) {
  const { actions } = useBuildActionsTable<
    ActionHistoryCall,
    CandidateHistoryCall
  >({
    actions: {
      view: {
        id: ActionHistoryCall.VIEW,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: 'View history log',
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionHistoryCall.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionHistoryCall.DELETE,
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

export default useBuildActionHistoryCall
