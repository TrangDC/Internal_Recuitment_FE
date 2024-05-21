import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Candidate } from 'features/candidates/domain/interfaces'
import useUpdateCandidate from '../../providers/hooks/useUpdateCandidate'
import { getInfoData } from 'shared/utils/utils'
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

function EditCandidateModal({ open, setOpen, rowData }: IEditCandidateModal) {
  const { onSubmit, control, isPending, isValid, setValue } =
    useUpdateCandidate({
      defaultValues: getInfoData({
        field: ['dob', 'email', 'phone', 'name', 'id'],
        object: {
          ...rowData,
          note: '',
          dob: new Date(rowData?.dob as string),
        },
      }),
      callbackSuccess: () => {
        setOpen(false)
      },
    })

  const translation = useTextTranslation()

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

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
                      textFieldProps={{
                        fullWidth: true,
                        size: 'small',
                        required: true,
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
          <UpdateRecord callbackSubmit={callbackSubmit}>
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
