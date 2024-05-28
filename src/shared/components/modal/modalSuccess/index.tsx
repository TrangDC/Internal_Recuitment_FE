import BaseModal from 'shared/components/modal'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppButton from 'shared/components/buttons/AppButton'
import { Box } from '@mui/material'
import SuccessIcon from 'shared/components/icons/SuccessIcon'

interface ISuccessModal {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  onSubmit?: () => void
}

function SuccessModal({ open, setOpen, title, onSubmit }: ISuccessModal) {
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={560}>
      <BaseModal.Header
        title={title}
        setOpen={setOpen}
        Icon={<SuccessIcon />}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px" sxContentMain={{ padding: 0 }}>
        <Box></Box>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => {
              onSubmit?.()
              setOpen(false)
            }}
            sx={{
              backgroundColor: '#2499EF !important',
              color: 'white !important',
            }}
          >
            OK
          </AppButton>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default SuccessModal
