import dayjs from 'dayjs'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import BlackListIcon from 'shared/components/icons/BlackListIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import LinkIcon from 'shared/components/icons/Link'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import { getDomain, handleCopyClipBoard } from 'shared/utils/utils'

export enum ActionCandidateTable {
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
  COPY_LINK_TO_PROFILE = 'copy_link_to_profile',
  BLACK_LIST = 'black_list',
}
type UseAllCandidatePermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenBlackList: (id: string) => void
}

function useBuildActionTableCandidate({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenBlackList,
}: UseAllCandidatePermissionActionTableProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<ActionCandidateTable, Candidate>({
    actions: {
      detail: {
        id: ActionCandidateTable.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/candidate-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      copy_link_to_profile: {
        id: ActionCandidateTable.COPY_LINK_TO_PROFILE,
        onClick: (id, rowData) => {
          const url = `${getDomain()}/dashboard/candidate-detail/${id}`
          handleCopyClipBoard(
            url,
            `[PROFILE] ${rowData.name}${rowData.dob ? '_' + dayjs(rowData.dob).format('DDMMYYYY') : ''}`
          )
        },
        title: 'Copy application link',
        Icon: <LinkIcon />,
      },
      edit: {
        id: ActionCandidateTable.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      black_list: {
        id: ActionCandidateTable.BLACK_LIST,
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: translation.COMMON.add_to_blackList,
        Icon: <BlackListIcon />,
      },
      delete: {
        id: ActionCandidateTable.DELETE,
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

export default useBuildActionTableCandidate
