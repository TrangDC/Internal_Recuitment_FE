import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { Hiring } from '../domain/interfaces'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'

export enum ActionJobsOpen {
  EDIT = 'edit',
}

type UseBuildActionsTableHiringTeamProps = {
  handleOpenEdit: (id: string, row: Hiring) => void
}

function useBuildActionsTableHiringTeam({
  handleOpenEdit,
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
    },
  })
  return {
    actions,
  }
}

export default useBuildActionsTableHiringTeam
