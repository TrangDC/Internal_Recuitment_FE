import { FC, useState } from 'react'
import BaseModal from '.'
import AppButton from '../buttons/AppButton'
import ButtonLoading from '../buttons/ButtonLoading'
import FlexBox from '../flexbox/FlexBox'
import AppTextField from '../input-fields/AppTextField'
import { IReasonModal } from './interface'
import { Tiny12md } from '../Typography'

const ReasonModal: FC<IReasonModal> = ({
  open,
  setOpen,
  title,
  handlesubmit,
  handleClose,
  Icon,
  subTitle,
  isLoading = false,
}) => {
  const [reason, setReason] = useState('')
  return (
    <BaseModal.Wrapper
      maxWidth={800}
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
    >
      <BaseModal.Header
        title={title}
        setOpen={setOpen}
        subTitle={subTitle}
        Icon={Icon}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <FlexBox flexDirection={'row'} gap={4} marginTop={1}>
          <Tiny12md
            color={'#4D607A'}
            lineHeight={'14.63px'}
            mt={1}
            width={'45px'}
          >
            Reason
          </Tiny12md>
          <AppTextField
            rows={2}
            multiline
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </FlexBox>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <AppButton variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </AppButton>
        <ButtonLoading
          variant="contained"
          handlesubmit={() => handlesubmit(reason)}
          loading={isLoading}
        >
          Confirm
        </ButtonLoading>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ReasonModal
