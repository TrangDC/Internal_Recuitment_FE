import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'

export enum ActionHistoryCall {
  EDIT = 'edit',
  DELETE = 'delete',
}
type UseBuildActionHistoryCallProps = {
  handleOpenEdit: (id: string, rowData: CandidateHistoryCall) => void
  handleOpenDelete: (id: string) => void
}

function useBuildActionHistoryCall({
  handleOpenEdit,
  handleOpenDelete,
}: UseBuildActionHistoryCallProps) {
  const { actions } = useBuildActionsTable<
    ActionHistoryCall,
    CandidateHistoryCall
  >({
    actions: {
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
