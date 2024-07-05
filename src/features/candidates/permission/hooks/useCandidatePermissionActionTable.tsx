import dayjs from 'dayjs'
import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import BlackListIcon from 'shared/components/icons/BlackListIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import LinkIcon from 'shared/components/icons/Link'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import { getDomain, handleCopyClipBoard } from 'shared/utils/utils'

type IActionJobsOpen =
  | 'detail'
  | 'edit'
  | 'delete'
  | 'copy-link-to-profile'
  | 'black_list'

type UseAllCandidatePermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenBlackList: (id: string) => void
}

function useAllCandidatePermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenBlackList,
}: UseAllCandidatePermissionActionTableProps) {
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
      'copy-link-to-profile': {
        id: 'copy-link-to-profile',
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
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      black_list: {
        id: 'black_list',
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: translation.COMMON.add_to_blackList,
        Icon: <BlackListIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id, rowData) => {
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
        newActions = utils.removeAction(newActions, ['black_list'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useAllCandidatePermissionActionTable
