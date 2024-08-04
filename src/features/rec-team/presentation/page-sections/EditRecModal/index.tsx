import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import { Fragment } from 'react/jsx-runtime'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useUpdateRecTeam from 'features/rec-team/hooks/crud/useUpdateRecTeam'
import { useMemo, useState } from 'react'
import usePopup from 'contexts/popupProvider/hooks/usePopup'

interface IEditRecModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function EditRecTeamModal({ open, setOpen, id }: IEditRecModal) {
  const { actions, control, isValid, isPending, isGetting, formState } =
    useUpdateRecTeam({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })
  const { onSubmit } = actions
  const { handleWarning, handleReset } = usePopup()
  const [recId, setRecId] = useState<string>('')

  const translation = useTextTranslation()

  const show_Warning = useMemo(() => {
    return !!(recId && recId !== id)
  }, [recId, id])

  const callbackSubmit = (reason: string) => {
    if (!show_Warning) {
      onSubmit(reason)
      return
    }

    handleWarning({
      title: 'Warning',
      content: `The selected leader is currently in a different REC team. This change will also move the user to this team. Proceeding?`,
      onSubmit: () => {
        onSubmit(reason)
        handleReset()
      },
    })
  }

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Edit REC team"
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
                  render={({ field, fieldState }) => {
                    return (
                      <FlexBox alignItems={'center'} flexDirection={'column'}>
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
                    )
                  }}
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
                          rec_team_ids: [id],
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

export default EditRecTeamModal
