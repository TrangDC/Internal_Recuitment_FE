import { Team } from 'features/teams/domain/interfaces'
import { H1 } from 'shared/components/Typography'
import BaseModal from 'shared/components/modal'

interface IEditTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Team
}

function EditTeamModal({ open, setOpen, rowData }: IEditTeamModal) {
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="Edit team" setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain>
        <H1>{rowData?.id}</H1>
        <H1>{rowData?.name}</H1>
        <H1>{rowData?.open_request}</H1>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <H1>121</H1>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default EditTeamModal
