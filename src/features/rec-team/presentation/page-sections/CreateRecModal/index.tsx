import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import { Fragment } from 'react/jsx-runtime'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppTextField from 'shared/components/input-fields/AppTextField'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useCreateRecTeam from 'features/rec-team/hooks/crud/useCreateRecTeam'
import { useState } from 'react'
import usePopup from 'contexts/popupProvider/hooks/usePopup'

interface ICreateRecTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateRecModal({ open, setOpen }: ICreateRecTeamModal) {
  const { onSubmit, control, isPending, isValid, formState, setRecId } = useCreateRecTeam(
    {
      callbackSuccess: () => {
        setOpen(false)
      },
    }
  )

  const translation = useTextTranslation()

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Add a new REC team"
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
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="leader_id"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <MemberAutoComplete
                        value={field.value || []}
                        onCustomChange={(value) => {
                          field.onChange(value?.id)
                          setRecId(value?.rec_team_id ?? '')
                        }}
                        multiple={false}
                        name={field.name}
                        filter={{
                          is_able_to_leader_rec_team: true,
                        }}
                        textFieldProps={{
                          required: true,
                          label: `Leader`,
                        }}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Description'}
                        size="small"
                        fullWidth
                        value={field.value ?? ''}
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
    </ConfirmableModalProvider>
  )
}

export default CreateRecModal
