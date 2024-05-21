import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useCreateTeam from '../../providers/hooks/useCreateTeam'
import useTextTranslation from 'shared/constants/text'
import { Fragment } from 'react/jsx-runtime'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppTextField from 'shared/components/input-fields/AppTextField'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'

interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  const { onSubmit, control, isPending, isValid } = useCreateTeam({
    callbackSuccess: () => {
      setOpen(false)
    },
  })

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_TEAMS.add_a_new_team}
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
                name="members"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <MemberAutoComplete
                      value={field.value || []}
                      onChange={field.onChange}
                      multiple={true}
                      name={field.name}
                      textFieldProps={{
                        label: `Team's Manager`,
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
  )
}

export default CreateTeamModal
