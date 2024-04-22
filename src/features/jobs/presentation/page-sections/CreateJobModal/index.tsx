import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { TEAM } from 'features/jobs/domain/interfaces'
import { useEffect, useState } from 'react'
import { mockApiGetListTeam } from '../../providers/hooks/useJobTable'
import {
  LOCATION_DATA,
  SALARY_DATA,
} from 'shared/constants/constants'
import { baseInstance } from 'shared/interfaces'
import useCreateJob from '../../providers/hooks/useCreateJob'
import { get } from 'lodash'
import { SALARY_RENDER } from '../../providers/constants'

interface ICreateJobModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateJobModal({ open, setOpen }: ICreateJobModal) {
  const { onSubmit, useFormReturn } = useCreateJob()
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

  const requester: baseInstance[] = [
    { id: 1, name: 'David' },
    { id: 2, name: 'Alejandro' },
    { id: 3, name: 'Hulk' },
    { id: 4, name: 'Jenny' },
  ]

  const salary = useWatch({ control, name: 'salary' })

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
      <BaseModal.Header title="New job" setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Job name "
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
                name="teams"
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
                name="location"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={Object.keys(LOCATION_DATA).map(
                      (salary, index) => ({
                        id: index,
                        name: get(LOCATION_DATA, salary),
                      })
                    )}
                    label="name"
                    inputLabel="Location"
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
                name="requester"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={requester}
                    label="name"
                    inputLabel="Requester"
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={1}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={Object.keys(SALARY_DATA).map((salary, index) => ({
                      id: index,
                      name: get(SALARY_DATA, salary),
                    }))}
                    label="name"
                    inputLabel="Salary"
                    errors={errors}
                    field={field}
                    keySelect="id"
                  />
                )}
              />
            </Grid>
            {SALARY_RENDER.map((salary_item, index) => {
              return salary_item.typeComponent === 'textField' &&
              //@ts-ignore
                salary_item.accept.includes(salary?.name) ? (
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
                      />
                    )}
                  />
                </Grid>
              ) : salary_item.typeComponent === 'autoComplete' &&
               //@ts-ignore
                salary_item.accept.includes(salary?.name) ? (
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
                name="staft_required"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Staff required"
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
        <FlexBox gap={'10px'} justifyContent={'center'} width={'100%'}>
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

export default CreateJobModal
