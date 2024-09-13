import { Box, FormControl } from '@mui/material'
import useUpdateJob from 'features/jobs/hooks/crud/useEditJob'
import CreateSelectionMemberPermission from 'features/jobs/permission/components/CreateSelectionMemberPermission'
import CreateSelectionTeamPermission from 'features/jobs/permission/components/CreateSelectionTeamPermission'
import { SALARY_RENDER } from 'features/jobs/shared/constants'
import { FormDataSchema } from 'features/jobs/shared/constants/schema'
import { t } from 'i18next'
import { Fragment } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import CurrencyAutoComplete from 'shared/components/autocomplete/currency-autocomplete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import JobPositionAutoComplete from 'shared/components/autocomplete/job-position-auto-complete'
import LevelAutoComplete from 'shared/components/autocomplete/level-auto-complete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import SalaryTypeAutoComponent from 'shared/components/autocomplete/salary-type-autocomplete'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputNumberComponent from 'shared/components/form/inputNumberComponent'
import { SpanText } from 'shared/components/form/styles'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AiIcon from 'shared/components/icons/Ai'
import ExPoint from 'shared/components/icons/ExPoint'
import MicroScope from 'shared/components/icons/Microscope'
import AppTextField from 'shared/components/input-fields/AppTextField'
import EditorBoxField from 'shared/components/input-fields/EditorField'
import NumberField from 'shared/components/input-fields/NumberField'
import TooltipComponent from 'shared/components/tooltip'
import SkillTreeSelection from 'shared/components/tree/skill-tree'
import { Text15md } from 'shared/components/Typography'
import IconScreen from 'shared/components/utils/IconScreen'
import useTextTranslation from 'shared/constants/text'
import {
  BottomLine,
  BoxWrapperOuterContainer,
  ContainerWrapper,
} from 'shared/styles'

const EditJobRequest = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    actions,
    control,
    isPending,
    isValid,
    isGetting,
    loadingBtnGenerate,
    watch,
  } = useUpdateJob({
    id: id as string,
    onSuccess: () => {
      navigate(-1)
    },
  })
  const { resetSalary, onSubmit, handleGenerateJD, resetRecInCharge } = actions

  const rec_id = watch('rec_team_id')
  const status = watch('status')
  const translation = useTextTranslation()
  const salary = useWatch({ control, name: 'salary_type' })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={MicroScope}
          textLabel="Edit job request"
          go_back={true}
        />
      </Box>
      <BoxWrapperOuterContainer>
        <ContainerWrapper>
          <FlexBox flexDirection={'column'} gap={2.5} width={'100%'}>
            {/* hiring platform */}
            <FlexBox flexDirection={'column'} gap={2.5}>
              <Text15md color={'#00508A'}>Hiring platform</Text15md>
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
                    name="job_position_id"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <JobPositionAutoComplete
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          multiple={false}
                          textFieldProps={{
                            required: true,
                            label: 'Job position',
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
                    name="location"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <LocationAutoComplete
                          value={field.value}
                          onChange={(data) => field.onChange(data?.value)}
                          multiple={false}
                          textFieldProps={{
                            required: true,
                            label: 'Location',
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
                    name="salary_type"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <SalaryTypeAutoComponent
                          value={field.value}
                          onChange={(data) => {
                            field.onChange(data?.value)
                            resetSalary()
                          }}
                          multiple={false}
                          textFieldProps={{
                            required: true,
                            label: 'Salary',
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </Fragment>
                    )}
                  />
                </FormControl>

                {SALARY_RENDER.map((salary_item, index) => {
                  return salary_item.typeComponent === 'textField' &&
                    salary_item.accept.includes(salary) ? (
                    <FormControl fullWidth key={index}>
                      <Controller
                        //@ts-ignore
                        name={salary_item.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <InputNumberComponent<FormDataSchema>
                              label={salary_item?.label}
                              field={field}
                              fullWidth
                              type={salary_item?.type}
                              style={salary_item?.style}
                              sx={{
                                '&.MuiFormControl-root': {
                                  marginTop: '0px !important',
                                },
                              }}
                              required={true}
                              thousandSeparator={salary_item?.thousandSeparator}
                              allowNegative={false}
                            />
                            <HelperTextForm
                              message={fieldState.error?.message}
                            ></HelperTextForm>
                          </Fragment>
                        )}
                      />
                    </FormControl>
                  ) : salary_item.typeComponent === 'autoComplete' &&
                    salary_item.accept.includes(salary) ? (
                    <FormControl fullWidth key={index}>
                      <Controller
                        //@ts-ignore
                        name={salary_item.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <CurrencyAutoComplete
                              value={field.value as string}
                              onChange={(data) => field.onChange(data?.value)}
                              multiple={false}
                              textFieldProps={{
                                required: true,
                                label: 'Unit',
                              }}
                            />
                            <HelperTextForm
                              message={fieldState.error?.message}
                            ></HelperTextForm>
                          </Fragment>
                        )}
                      />
                    </FormControl>
                  ) : null
                })}

                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="hiring_team_id"
                    render={({ field, fieldState }) => {
                      return (
                        <Fragment>
                          <CreateSelectionTeamPermission
                            name={field.name}
                            value={field?.value ?? ''}
                            onChange={(value) => {
                              field.onChange(value ?? '')
                            }}
                            disabled={
                              status !==
                              JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS
                            }
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="created_by"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <CreateSelectionMemberPermission name={field.name}
                          value={field?.value ?? ''}
                          onChange={(value) => {
                            field.onChange(value ?? '')
                          }} />
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
                    name="entity_skill_records"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <SkillTreeSelection
                          value={field.value}
                          onChange={field.onChange}
                          textFieldProps={{ label: 'Skill needed' }}
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
                    name="amount"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <NumberField
                          label={
                            <FlexBox gap={0.5} alignItems={'baseline'}>
                              <SpanText>Quantity</SpanText>
                              <SpanText color="#DB6C56">*</SpanText>
                              <TooltipComponent
                                title={t('tooltip.job_request.staff_needed')}
                              >
                                <ExPoint />
                              </TooltipComponent>
                            </FlexBox>
                          }
                          //@ts-ignore
                          size={'small'}
                          fullWidth={true}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value.replaceAll('.', ''))
                          }}
                          allowNegative={false}
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
                    name="level"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <LevelAutoComplete
                          multiple={false}
                          value={field.value ?? ''}
                          onChange={(data) => {
                            field.onChange(data?.value)
                          }}
                          textFieldProps={{
                            label: (
                              <FlexBox gap={0.5} alignItems={'baseline'}>
                                <SpanText>Staff level</SpanText>
                                <SpanText color="#DB6C56">*</SpanText>
                                <TooltipComponent
                                  title={t('tooltip.job_request.staff_level')}
                                >
                                  <ExPoint />
                                </TooltipComponent>
                              </FlexBox>
                            ),
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

              <BottomLine></BottomLine>
            </FlexBox>

            {/* recruit platform */}
            <FlexBox flexDirection={'column'} gap={2.5}>
              <Text15md color={'#00508A'}>Recruitment Information</Text15md>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <PriorityAutoComplete
                          value={field.value}
                          onChange={(data) => field.onChange(data?.value)}
                          multiple={false}
                          textFieldProps={{
                            required: true,
                            label: 'Priority',
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
                    name="status"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <StatusJobAutoComplete
                          value={field.value ?? ''}
                          onChange={(data) => field.onChange(data?.value)}
                          multiple={false}
                          disabled={true}
                          textFieldProps={{
                            required: true,
                            label: 'Status',
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
                    name="rec_team_id"
                    render={({ field, fieldState }) => {
                      return (
                        <Fragment>
                          <RecTeamsAutoComplete
                            name={field.name}
                            value={field?.value ?? ''}
                            onChange={(value) => {
                              field.onChange(value ?? '')
                              resetRecInCharge()
                            }}
                            disabled={
                              status !==
                              JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS
                            }
                            textFieldProps={{
                              label: (
                                <FlexBox gap={0.5} alignItems={'baseline'}>
                                  <SpanText>REC team</SpanText>
                                  <SpanText color="#DB6C56">*</SpanText>
                                  <TooltipComponent
                                    title={t('tooltip.job_request.rec_team')}
                                  >
                                    <ExPoint />
                                  </TooltipComponent>
                                </FlexBox>
                              ),
                            }}
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="rec_in_charge_id"
                    render={({ field, fieldState }) => {
                      return (
                        <Fragment>
                          <InterViewerAutoComplete
                            name={field.name}
                            value={field?.value ?? ''}
                            filter={{
                              rec_team_ids: rec_id ? [rec_id] : null,
                            }}
                            disabled={!rec_id}
                            onChange={(value) => {
                              field.onChange(value ?? '')
                            }}
                            textFieldProps={{
                              label: (
                                <FlexBox gap={0.5} alignItems={'baseline'}>
                                  <SpanText>REC in charge</SpanText>
                                  <SpanText color="#DB6C56">*</SpanText>
                                  <TooltipComponent
                                    title={t(
                                      'tooltip.job_request.rec_in_charge'
                                    )}
                                  >
                                    <ExPoint />
                                  </TooltipComponent>
                                </FlexBox>
                              ),
                            }}
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )
                    }}
                  />
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="note"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          label={'Note'}
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

              <BottomLine></BottomLine>
            </FlexBox>

            {/* job description */}
            <FlexBox flexDirection={'column'} gap={2.5}>
              <FlexBox justifyContent={'space-between'} alignItems={'center'}>
                <Text15md color={'#00508A'}>Job description</Text15md>
                <ButtonLoading
                  variant="contained"
                  startIcon={<AiIcon />}
                  disabled={isValid}
                  handlesubmit={handleGenerateJD}
                  loading={loadingBtnGenerate === 'UPLOADING' ? true : false}
                  type="button"
                >
                  Generate JD by AI
                </ButtonLoading>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <EditorBoxField
                          label={'Job description'}
                          value={field.value ?? ''}
                          pluginCustomize={[
                            'talenaMakeLonger',
                            'talenaMakeShorter',
                            'correctGrammar',
                            'makeProfessional',
                          ]}
                          onEditorChange={(value) => {
                            field.onChange(value)
                          }}
                          initProps={{
                            contextmenu:
                              'talenaMakeLonger talenaMakeShorter correctGrammar makeProfessional',
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

              <BottomLine></BottomLine>
            </FlexBox>
          </FlexBox>

          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={() => navigate(-1)}
            >
              {translation.COMMON.cancel}
            </AppButton>
            <ButtonEdit
              disabled={isValid || loadingBtnGenerate === 'UPLOADING'}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonEdit>
          </FlexBox>
        </ContainerWrapper>
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default EditJobRequest
