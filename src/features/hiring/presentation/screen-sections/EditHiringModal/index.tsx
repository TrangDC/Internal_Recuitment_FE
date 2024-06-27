import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Hiring } from 'features/hiring/domain/interfaces'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import useEditHiring from 'features/hiring/hooks/useEditHiring'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'

interface IEditHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Hiring
}

function EditHiringModal({ open, setOpen, id }: IEditHiringModal) {
  const { actions, control, isValid, isPending, isGetting, formState } =
    useEditHiring({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })
  const { callbackSubmit } = actions
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Edit hiring team"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox justifyContent={'center'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
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
                  )}
                />
              </FormControl>
            </FlexBox>
            <FlexBox justifyContent={'center'} alignItems={'center'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="work_email"
                  render={({ field, fieldState }) => (
                    <FlexBox alignItems={'center'} flexDirection={'column'}>
                      <AppTextField
                        label={'Email'}
                        required
                        size="small"
                        fullWidth
                        disabled
                        value={field.value}
                        loading={isGetting}
                        onChange={field.onChange}
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
              Cancel
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

export default EditHiringModal
