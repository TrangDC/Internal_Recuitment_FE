import { H1 } from 'shared/components/Typography'
import BaseModal from 'shared/components/modal'

interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Create team"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <H1>121</H1>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <H1>121</H1>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateTeamModal
