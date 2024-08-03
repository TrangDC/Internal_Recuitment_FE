import { ReactNode, useState } from 'react'
import AppButton from '../AppButton'
import { LoadingButton } from '@mui/lab'
import BaseModal from 'shared/components/modal'
import AppTextField from 'shared/components/input-fields/AppTextField'
import useTextTranslation from 'shared/constants/text'
import { Box, Grid } from '@mui/material'

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
  const translation = useTextTranslation()
  const [reason, setReason] = useState('')
  function handlesubmit() {
    onClick(reason)
  }

  return (
    <BaseModal.Wrapper maxWidth={500} setOpen={setOpen} open={open}>
      <BaseModal.Header
        title={title}
        setOpen={setOpen}
        subTitle={subTitle}
        Icon={Icon}
      ></BaseModal.Header>
      <Box maxHeight="500px" padding={'20px 30px'}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AppTextField
              rows={2}
              multiline
              label={translation.COMMON.description}
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <BaseModal.Footer>
        <AppButton
          variant="outlined"
          onClick={() => setOpen(false)}
          sx={{
            width: '50%',
          }}
        >
          {translation.COMMON.cancel}
        </AppButton>
        {loading ? (
          <LoadingButton
            data-testid="btn-submit"
            variant="contained"
            size="small"
            loading
            disabled
            sx={{
              width: '50%',
            }}
          >
            Please wait...
          </LoadingButton>
        ) : (
          <AppButton
            data-testid="btn-submit"
            variant="contained"
            onClick={handlesubmit}
            sx={{
              width: '50%',
            }}
          >
            {translation.COMMON.save}
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
