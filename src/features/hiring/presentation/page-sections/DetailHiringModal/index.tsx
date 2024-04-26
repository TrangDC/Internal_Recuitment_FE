import { Hiring } from 'features/hiring/domain/interfaces'
import { H1 } from 'shared/components/Typography'
import BaseModal from 'shared/components/modal'

interface IDetailHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Hiring
}

function DetailHiringModal({ open, setOpen, rowData }: IDetailHiringModal) {
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Detail Hiring Team"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <H1>{rowData?.id}</H1>
        {/* <H1>{rowData?.open_request}</H1> */}
        <H1>{rowData?.name}</H1>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <H1></H1>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default DetailHiringModal
