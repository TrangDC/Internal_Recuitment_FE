import { FormControl } from '@mui/material'
import BaseModal from 'shared/components/modal'
import useCreateInterview from '../../providers/hooks/useCreateInterview'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Controller } from 'react-hook-form'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import CandidateAutoComplete from 'shared/components/autocomplete/candidate-auto-complete'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'
import { Fragment } from 'react'

interface IAddInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateInterviewModal(props: IAddInterviewModal) {
  const { open, setOpen } = props
  const { onSubmit, control, isValid, isPending } = useCreateInterview()
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Add new Interview"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <FlexBox flexDirection={'column'} gap={2}>
          <FlexBox
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={1}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <FlexBox alignItems={'center'} flexDirection={'column'}>
                    <AppTextField
                      label={'Interview title'}
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
                name="teamId"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TeamsAutoComplete
                      value={field.value}
                      onChange={field.onChange}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Team',
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </Fragment>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="jobId"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <JobsAutoComplete
                      value={field.value}
                      multiple={false}
                      onChange={field.onChange}
                      textFieldProps={{
                        required: true,
                        label: 'Job',
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
          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="interviewer"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <InterViewerAutoComplete
                      value={field.value}
                      onChange={field.onChange}
                      multiple={true}
                      textFieldProps={{
                        required: true,
                        label: 'Interviewer',
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
                name="candidateId"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <CandidateAutoComplete
                      value={field.value}
                      onChange={field.onChange}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Select candidate',
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </Fragment>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="candidateMail"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <AppTextField
                      label={'Candidate’s mail'}
                      required
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
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
                name="date"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <AppTextField
                      label={'Select date'}
                      required
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </Fragment>
                )}
              />
            </FormControl>
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="from"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <AppTextField
                        label={'From'}
                        required
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="to"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <AppTextField
                        label={'To'}
                        required
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
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
          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <FlexBox alignItems={'center'} flexDirection={'column'}>
                    <AppTextField
                      label={'Description'}
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      multiline
                      rows={3}
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
        <AppButton variant="outlined" size="small">
          Cancel
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
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateInterviewModal
