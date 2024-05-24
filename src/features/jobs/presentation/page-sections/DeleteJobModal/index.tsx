import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useDeleteJob from '../../providers/hooks/useDeleteJob'
import useTextTranslation from 'shared/constants/text'
import { Fragment, useState } from 'react'
import { t } from 'i18next'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FailedModal from 'shared/components/modal/modalFailed'
interface IDeleteJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DeleteJobModal({ open, setOpen, id }: IDeleteJobModal) {
  const [openFailed, setOpenFailed] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')

  const { onSubmit, control, isPending, isValid } = useDeleteJob({
    callbackSuccess: () => setOpen(false),
    defaultValues: {
      id: id,
      note: '',
    },
    callbackError: (data) => {
      setMsg(t(data?.message) as string)
      setOpenFailed(true)
    },
  })
  const translation = useTextTranslation()

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={translation.MODLUE_JOBS.delete_job}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={1}
            >
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="note"
                  render={({ field, fieldState }) => (
                    <FlexBox alignItems={'center'} flexDirection={'column'}>
                      <AppTextField
                        label={'Description'}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        multiline
                        minRows={4}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </FlexBox>
          </FlexBox>
        </BaseModal.ContentMain>
        <BaseModal.Footer>
          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={() => setOpen(false)}
            >
              {translation.COMMON.cancel}
            </AppButton>
            <ButtonLoading
              variant="contained"
              size="small"
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonLoading>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
      {openFailed && (
        <FailedModal
          open={openFailed}
          setOpen={setOpenFailed}
          title="Failed to delete"
          content={msg}
        />
      )}
    </Fragment>
  )
}

export default DeleteJobModal
