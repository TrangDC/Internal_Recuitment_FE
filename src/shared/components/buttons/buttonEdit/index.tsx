import { ReactNode, useState } from 'react'
import AppButton from '../AppButton'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import BaseModal from 'shared/components/modal'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny } from 'shared/components/Typography'
import AppTextField from 'shared/components/input-fields/AppTextField'
import useTextTranslation from 'shared/constants/text'

type IProps = {
  handlesubmit: (note: string) => void
  children: ReactNode
  title?: string
  loading: boolean
  Icon?: ReactNode
  subTitle?: string
  disabled: boolean
}

type ModalConfirmpProps = {
  onClick: (note: string) => void
  title: string
  loading: boolean
  Icon?: ReactNode
  subTitle?: string
  setOpen: (value: boolean) => void
  open: boolean
}

const ModalConfirm = ({
  onClick,
  setOpen,
  open,
  title,
  loading,
  subTitle,
  Icon,
}: ModalConfirmpProps) => {
  const { t } = useTranslation()
  const [reason, setReason] = useState('')
  function handlesubmit() {
    onClick(reason)
  }

  return (
    <BaseModal.Wrapper maxWidth={800} setOpen={setOpen} open={open}>
      <BaseModal.Header
        title={title}
        setOpen={setOpen}
        subTitle={subTitle}
        Icon={Icon}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <FlexBox flexDirection={'row'} gap={4}>
          <Tiny
            fontSize={12}
            color={'#4D607A'}
            lineHeight={'14.63px'}
            mt={1}
            width={'45px'}
          >
            {t('Reason')}
          </Tiny>
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
          {t('Cancel')}
        </AppButton>
        {loading ? (
          <LoadingButton
            data-testid="btn-submit"
            variant="contained"
            size="small"
            loading
            disabled
          >
            Please wait...
          </LoadingButton>
        ) : (
          <AppButton
            data-testid="btn-submit"
            variant="contained"
            onClick={handlesubmit}
          >
            {t('Confirm')}
          </AppButton>
        )}
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

const ButtonEdit = (props: IProps) => {
  const { handlesubmit, children, disabled, loading, Icon } = props
  const [open, setOpen] = useState(false)
  const translation = useTextTranslation()
  const title = props.title ?? translation.COMMON.update_record
  const subTitle = props.subTitle ?? translation.COMMON.sub_title_update_record
  return (
    <>
      <AppButton
        {...props}
        variant="contained"
        type="submit"
        onClick={() => setOpen(true)}
        disabled={disabled || loading}
      >
        {children}
      </AppButton>
      <ModalConfirm
        open={open}
        setOpen={setOpen}
        onClick={handlesubmit}
        title={title}
        loading={loading}
        subTitle={subTitle}
        Icon={Icon}
      />
    </>
  )
}

export default ButtonEdit
