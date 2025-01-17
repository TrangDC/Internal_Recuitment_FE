import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import { Fragment } from 'react/jsx-runtime'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useUpdateJobPosition from 'features/job-position/hooks/useUpdateJobPosition'

interface IEditJobPositionModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function EditJobPositionModal({ open, setOpen, id }: IEditJobPositionModal) {
  const {
    actions,
    control,
    isValid,
    isPending,
    isGetting,
    formState,
  } = useUpdateJobPosition({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })
  const { onSubmit } = actions

  const translation = useTextTranslation()

  const callbackSubmit = (reason: string) => {
    onSubmit(reason)
  }

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Edit job position"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox marginTop={1}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => {
                    return (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          label={'Name'}
                          required
                          size="small"
                          fullWidth
                          value={field.value}
                          onChange={field.onChange}
                          loading={isGetting}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )
                  }}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <AppTextField
                        label={'Description'}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        multiline
                        minRows={4}
                        loading={isGetting}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
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
            <UpdateRecord disabled={isValid} callbackSubmit={callbackSubmit}>
              <ButtonLoading
                variant="contained"
                size="small"
                disabled={isValid}
                handlesubmit={() => {}}
                loading={isPending}
              >
                Submit
              </ButtonLoading>
            </UpdateRecord>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default EditJobPositionModal
