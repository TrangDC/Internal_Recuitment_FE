import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import CandidateNote from 'shared/schema/database/candidate_note'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'

export enum ActionCandidateNote {
  EDIT = 'edit',
  DELETE = 'delete',
  VIEW = 'view',
}
type UseBuildActionCandidateNoteProps = {
  handleOpenEdit: (id: string, rowData: CandidateNote) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useBuildActionCandidateNote({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseBuildActionCandidateNoteProps) {
  const { actions } = useBuildActionsTable<ActionCandidateNote, CandidateNote>({
    actions: {
      view: {
        id: ActionCandidateNote.VIEW,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: 'View history log',
        Icon: <SearchIconSmall />,
      },
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
