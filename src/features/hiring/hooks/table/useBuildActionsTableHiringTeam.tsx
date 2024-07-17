import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import ViewIcon from 'shared/components/icons/View'
import { Hiring } from 'features/hiring/domain/interfaces'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'

export enum ActionJobsOpen {
  EDIT = 'edit',
  DETAIL = 'detail',
}

type UseBuildActionsTableHiringTeamProps = {
  handleOpenEdit: (id: string, row: Hiring) => void
  handleOpenDetail: (id: string, row: Hiring) => void
}

function useBuildActionsTableHiringTeam({
  handleOpenEdit,
  handleOpenDetail,
}: UseBuildActionsTableHiringTeamProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionJobsOpen, Hiring>({
    actions: {
      edit: {
        id: ActionJobsOpen.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      detail: {
        id: ActionJobsOpen.DETAIL,
        onClick: (id, rowData) => {
          handleOpenDetail(id, rowData)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
    },
  })
  return {
    actions,
  }
}

export default useBuildActionsTableHiringTeam
