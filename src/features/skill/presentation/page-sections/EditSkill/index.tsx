import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useUpdateSkill from '../../../hooks/crud/useUpdateSkill'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import SkillTypeAutoComplete from 'shared/components/autocomplete/skill-type-autocomplete'

interface IEditSkillModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function EditSkillModal({ open, setOpen, id }: IEditSkillModal) {
  const { actions, control, isPending, isValid, isGetting, formState } =
    useUpdateSkill({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })

  const { callbackSubmit } = actions
  const translation = useTextTranslation()

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={'Edit skill'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox gap={2}>
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
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="skill_type_id"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <SkillTypeAutoComplete
                        name={field.name}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                        }}
                        multiple={false}
                        textFieldProps={{
                          required: true,
                          label: 'Type',
                        }}
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
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
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

export default EditSkillModal
