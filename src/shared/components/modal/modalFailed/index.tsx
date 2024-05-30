import BaseModal from 'shared/components/modal'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppButton from 'shared/components/buttons/AppButton'
import { TinyText } from 'shared/components/form/styles'
import FailedIcon from 'shared/components/icons/FailedIcon'

interface IFailedModal {
  open: boolean
  setOpen: (value: boolean) => void
  title: string,
  content: string,
}

function FailedModal({ open, setOpen, title, content}: IFailedModal) {

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={560}>
      <BaseModal.Header
        title={title}
        setOpen={setOpen}
        Icon={<FailedIcon />}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <FlexBox flexDirection={'column'} gap={2}>
          <FlexBox
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={1}
          >
            <TinyText sx={{fontSize: 15, width: '100%'}}>{content}</TinyText>
          </FlexBox>
        </FlexBox>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => setOpen(false)}
            sx={{
                backgroundColor: '#2499EF !important',
                color: 'white !important'

            }}
          >
            OK
          </AppButton>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default FailedModal
