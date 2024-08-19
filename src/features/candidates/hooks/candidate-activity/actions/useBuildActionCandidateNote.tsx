import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import CandidateNote from 'shared/schema/database/candidate_note'

export enum ActionCandidateNote {
  EDIT = 'edit',
  DELETE = 'delete',
}
type UseBuildActionCandidateNoteProps = {
  handleOpenEdit: (id: string, rowData: CandidateNote) => void
  handleOpenDelete: (id: string) => void
}

function useBuildActionCandidateNote({
  handleOpenEdit,
  handleOpenDelete,
}: UseBuildActionCandidateNoteProps) {
  const { actions } = useBuildActionsTable<ActionCandidateNote, CandidateNote>({
    actions: {
      edit: {
        id: ActionCandidateNote.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionCandidateNote.DELETE,
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

export default useBuildActionCandidateNote
