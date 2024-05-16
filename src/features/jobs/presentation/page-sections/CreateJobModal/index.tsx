import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { baseInstance } from 'shared/interfaces'
import useCreateJob from '../../providers/hooks/useCreateJob'
import {
  LOCATION_DATA,
  SALARY_DATA,
  SALARY_RENDER,
} from '../../providers/constants'
import { Member, Team } from 'features/teams/domain/interfaces'
import useSelectTeam from 'shared/hooks/graphql/useSelecTeam'
import useSelectMember from 'shared/hooks/graphql/useSelectMember'
import EditorBoxComponent from 'shared/components/form/editorComponent'
import useTextTranslation from 'shared/constants/text'

interface ICreateJobModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateJobModal({ open, setOpen }: ICreateJobModal) {
  const handleCancelModel = () => {
    setOpen(false)
  }

  const { onSubmit, useFormReturn } = useCreateJob({
    callbackSuccess: handleCancelModel,
    defaultValues: {
      description: '',
    }
  })
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormReturn

  const { teams } = useSelectTeam()
  const { members } = useSelectMember()
  const translation = useTextTranslation()

  const salary = useWatch({ control, name: 'salary_type' })
  const resetSalary = () => {
    setValue('salary_from', 0)
    setValue('salary_to', 0)
  }

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
      <BaseModal.Header
        title={translation.MODLUE_JOBS.new_job}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label={translation.MODLUE_JOBS.job_name}
                    size="small"
                    field={field}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="team_id"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Team>
                    options={teams}
                    label="name"
                    inputLabel={translation.MODLUE_TEAMS.team}
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={LOCATION_DATA}
                    label="name"
                    inputLabel={translation.COMMON.location}
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="created_by"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Member>
                    options={members}
                    label="name"
                    inputLabel={translation.MODLUE_JOBS.requester}
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="salary_type"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={SALARY_DATA}
                    label="name"
                    inputLabel={translation.COMMON.salary}
                    errors={errors}
                    field={field}
                    callbackOnChange={({ previousValue, value }) => {
                      resetSalary()
                    }}
                  />
                )}
              />
            </Grid>
            {SALARY_RENDER.map((salary_item, index) => {
              return salary_item.typeComponent === 'textField' &&
                //@ts-ignore
                salary_item.accept.includes(salary?.value) ? (
                <Grid item xs={salary_item.xs} key={index}>
                  <Controller
                    //@ts-ignore
                    name={salary_item.name}
                    control={control}
                    render={({ field }) => (
                      <InputComponent<FormDataSchema>
                        errors={errors}
                        label={salary_item?.label}
                        field={field}
                        fullWidth
                        type={salary_item?.type}
                        style={salary_item?.style}
                        thousandSeparator={salary_item?.thousandSeparator}
                      />
                    )}
                  />
                </Grid>
              ) : salary_item.typeComponent === 'autoComplete' &&
                //@ts-ignore
                salary_item.accept.includes(salary?.value) ? (
                <Grid key={index} item xs={salary_item.xs}>
                  <Controller
                    //@ts-ignore
                    name={salary_item.name}
                    control={control}
                    render={({ field }) => (
                      <AutoCompleteComponent<FormDataSchema, baseInstance>
                        //@ts-ignore
                        options={salary_item.options}
                        //@ts-ignore
                        label={salary_item.label}
                        inputLabel={salary_item.inputLabel}
                        errors={errors}
                        field={field}
                      />
                    )}
                  />
                </Grid>
              ) : null
            })}
            <Grid item xs={6}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label={translation.MODLUE_JOBS.staft_required}
                    field={field}
                    fullWidth
                    required
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <EditorBoxComponent<FormDataSchema>
                    errors={errors}
                    label={translation.COMMON.description}
                    field={field}
                    required={true}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <CustomeButtonCancel
            type="button"
            variant="contained"
            onClick={handleCancelModel}
          >
            {translation.COMMON.cancel}
          </CustomeButtonCancel>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {translation.COMMON.save}
          </Button>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateJobModal
