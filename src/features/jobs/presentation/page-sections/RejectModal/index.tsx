import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import { Fragment } from 'react'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import useChangeApprovals from 'features/jobs/hooks/crud/useApprovalJob'
import usePopup from 'contexts/popupProvider/hooks/usePopup'

interface IRejectModal {
  open: boolean
  setOpen: (value: boolean) => void
  onSuccess?: () => void
  listRecord: string[]
}

function RejectModal({ open, setOpen, onSuccess, listRecord }: IRejectModal) {
  const { handleSuccess } = usePopup();
  const { action, control, isPending, isValid } = useChangeApprovals({
    onSuccess: () => {
      setOpen(false)
      handleSuccess({
        title: 'Reject successfully'
      })
      onSuccess?.()
    },
    defaultValue: {
      status: 'rejected',
      hiring_job_ids: listRecord,
    },
  })

  const { onSubmit } = action
  const translation = useTextTranslation()

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={`Do you want to reject ${listRecord.length} job request?`}
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
    </Fragment>
  )
}

export default RejectModal
