import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { TEAM } from 'features/jobs/domain/interfaces'
import { useEffect, useState } from 'react'
import { mockApiGetListTeam } from 'features/jobs/presentation/providers/hooks/useJobTable'
import DatePickerComponent from 'shared/components/form/datePickerComponent'
import useCreateInterview from '../../providers/hooks/useCreateInterview'

interface ICreateInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateInterviewModal({ open, setOpen }: ICreateInterviewModal) {
  const { onSubmit, useFormReturn } = useCreateInterview()
  const {
    control,
    formState: { errors },
  } = useFormReturn

  //MockAPI
  const [teams, setTeams] = useState<TEAM[]>([])
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetListTeam())
    }).then((response: any) => {
      setTeams(response.sortData)
    })
  }, [])

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="Add New Interview" setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="team"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, TEAM>
                    options={teams}
                    label="name"
                    inputLabel="Team"
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
                name="job_name"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Job name"
                    field={field}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Controller
                name="interviewers"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, TEAM>
                    options={teams}
                    label="name"
                    inputLabel="Interviewers"
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
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePickerComponent<FormDataSchema>
                  textFieldProps={{fullWidth: true, size: 'small', required: true}}
                    errors={errors}
                    label="Select date time"
                    field={field}
                  />
                )}
              />
            </Grid>


            <Grid item xs={3}>
              <Controller
                name="from_date"
                control={control}
                render={({ field }) => (
                  <DatePickerComponent<FormDataSchema>
                  textFieldProps={{fullWidth: true, size: 'small'}}
                    errors={errors}
                    label="From"
                    field={field}
                    
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="to_date"
                control={control}
                render={({ field }) => (
                  <DatePickerComponent<FormDataSchema>
                  textFieldProps={{fullWidth: true, size: 'small'}}
                    errors={errors}
                    label="To"
                    field={field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Description"
                    field={field}
                    fullWidth
                    multiline
                    minRows={4}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <CustomeButtonCancel type="button" variant="contained">
            Cancel
          </CustomeButtonCancel>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Save
          </Button>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateInterviewModal
