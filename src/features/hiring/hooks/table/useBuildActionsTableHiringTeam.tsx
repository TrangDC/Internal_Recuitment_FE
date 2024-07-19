import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import { Hiring } from 'features/hiring/domain/interfaces'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'

export enum ActionJobsOpen {
  EDIT = 'edit',
  DETAIL = 'detail',
}

type UseBuildActionsTableHiringTeamProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDetail: (id: string) => void
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
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      detail: {
        id: ActionJobsOpen.DETAIL,
        onClick: (id) => {
          handleOpenDetail(id)
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
