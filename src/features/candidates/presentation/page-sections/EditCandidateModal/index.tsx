import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Candidate } from 'features/candidates/domain/interfaces'
import useUpdateCandidate from '../../providers/hooks/useUpdateCandidate'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppDateField from 'shared/components/input-fields/DateField'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'

interface IEditCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Candidate
}

function EditCandidateModal({
  open,
  setOpen,
  rowData,
  id,
}: IEditCandidateModal) {
  const { actions, control, isPending, isValid, isGetting } =
    useUpdateCandidate({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })

  const { callbackSubmit } = actions
  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_CANDIDATES.edit_candidate}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
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
                name="phone"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      label={'Phone'}
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
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      label={'Email'}
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
                name="dob"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      label={'DOB'}
                      value={field.value}
                      onChange={field.onChange}
                      format="dd/MM/yyyy"
                      textFieldProps={{
                        fullWidth: true,
                        size: 'small',
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
  )
}

export default EditCandidateModal
