import FlexBox from 'shared/components/flexbox/FlexBox'
import BaseModal from 'shared/components/modal'

interface IDetailIntefviewModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function DetailIntefviewModal(props: IDetailIntefviewModal) {
  const { open, setOpen } = props
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Interview Software Engineer"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <FlexBox flexDirection={'column'} gap={2}></FlexBox>
      </BaseModal.ContentMain>
    </BaseModal.Wrapper>
  )
}

export default DetailIntefviewModal
