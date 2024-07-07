import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useCreateCandidate from '../../../hooks/crud/useCreateCandidate'
import useTextTranslation from 'shared/constants/text'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppDateField from 'shared/components/input-fields/DateField'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { Span, Tiny } from 'shared/components/Typography'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import CandidateSourceAutoComplete, {
  CANDIDATE_SOURCE_STATE,
  TypeCandidateSource,
} from 'shared/components/autocomplete/candidate-source-auto-complete'
import CandidateBySource from './components/CandidateBySource'
import NationalityAutoComplete from 'shared/components/autocomplete/nationality-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import SkillTree from 'shared/components/tree/skill-tree'

interface ICreateCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateCandidateModal({ open, setOpen }: ICreateCandidateModal) {
  const { onSubmit, control, isPending, isValid, watch, actions, formState } =
    useCreateCandidate({
      callbackSuccess: () => {
        setOpen(false)
      },
    })

  const translation = useTextTranslation()
  const candidate_source = watch('reference_type')

  const { resetSourceValue } = actions

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={translation.MODLUE_CANDIDATES.add_new_candidate}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <NationalityAutoComplete
                        value={field.value ?? ''}
                        onChange={(nationality) => {
                          field.onChange(nationality?.value)
                        }}
                        multiple={false}
                        textFieldProps={{
                          label: `Nationality`,
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
                        format="dd/MM/yyyy"
                        onChange={field.onChange}
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
            {/* add */}
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="reference_type"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <CandidateSourceAutoComplete
                        value={field.value}
                        onChange={(recruit) => {
                          resetSourceValue()
                          field.onChange(recruit?.value)
                        }}
                        multiple={false}
                        textFieldProps={{
                          label: `Candidate source`,
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
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="reference_value"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <CandidateBySource
                        name={field.name}
                        onChange={field.onChange}
                        source={candidate_source as TypeCandidateSource}
                        value={field.value}
                        required={true}
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
                  name="reference_uid"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <InterViewerAutoComplete
                        value={field.value || ''}
                        onChange={(data) => {
                          field.onChange(data ?? '')
                        }}
                        multiple={false}
                        name={field.name}
                        textFieldProps={{
                          label: `Recruiter`,
                          required:
                            candidate_source === CANDIDATE_SOURCE_STATE.REC,
                        }}
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
                  name="recruit_time"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppDateField
                        label={'Recruit time'}
                        value={field.value}
                        format="dd/MM/yyyy"
                        onChange={field.onChange}
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

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="entity_skill_records"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <SkillTree
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
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'HR Note'}
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

            <FlexBox justifyContent={'center'} alignItems={'center'}>
              <FormControl fullWidth>
                <Controller
                  name="attachments"
                  shouldUnregister
                  control={control}
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <InputFileComponent
                        field={field}
                        inputFileProps={{
                          maxFile: 10,
                          multiple: true,
                          maxSize: 20,
                          msgError: {
                            is_valid: 'One PDF file only, file size up to 20MB',
                            maxSize: 'One PDF file only, file size up to 20MB',
                            maxFile: 'One PDF file only, file size up to 20MB',
                          },
                          descriptionFile: () => {
                            return (
                              <Box>
                                <Span sx={{ color: '#2A2E37 !important' }}>
                                  {' '}
                                  Candidate attachments{' '}
                                </Span>
                                <Tiny sx={{ color: '#2A2E37 !important' }}>
                                  Up to 10 files and 20mb/file
                                </Tiny>
                              </Box>
                            )
                          },
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

export default CreateCandidateModal
