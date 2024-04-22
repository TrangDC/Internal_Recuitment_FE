import BaseModal from 'shared/components/modal'
import { useForm, Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { CURRENCY, Job, LOCATION, TEAM } from 'features/jobs/domain/interfaces'
import { useEffect, useState } from 'react'
import {
  mockApiGetListLocation,
  mockApiGetListTeam,
} from '../../providers/hooks/useJobTable'

interface IDetailJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Job
}

function DetailJobModal({ open, setOpen, rowData }: IDetailJobModal) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // team_name: '',
      // managers: [],
      // teams: rowData?.team,
      // title: rowData?.title,

    },
  })

  //watch values
  // useWatch({
  //   control,
  //   name: ['managers'],
  // })

  const onSubmit = (data: any) => {
    console.log('data', data)
  }

  //MockAPI
  const [teams, setTeams] = useState<TEAM[]>([])
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetListTeam())
    }).then((response: any) => {
      setTeams(response.sortData)
    })
  }, [])

  const [location, setLocation] = useState<LOCATION[]>([])
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetListLocation())
    }).then((response: any) => {
      setLocation(response.sortData)
    })
  }, [])
  //

  const currency: CURRENCY[] = [
    {
      id: 1,
      name: 'VND',
    },
    {
      id: 2,
      name: 'USD',
    },
    {
      id: 3,
      name: 'JPY',
    },
  ]
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Detail Job"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Controller
                name="teams"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, TEAM>
                    options={teams}
                    label="name"
                    inputLabel="Team's"
                    errors={errors}
                    field={field}
                    keySelect="id"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Job Title"
                    field={field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, LOCATION>
                    options={location}
                    label="name"
                    inputLabel="Location"
                    errors={errors}
                    field={field}
                    keySelect="id"
                  />
                )}
              />
            </Grid>

            <Grid item xs={5}>
              <Controller
                name="salary_from"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Salary From"
                    field={field}
                    fullWidth
                    type='number'
                  />
                )}
              />
            </Grid>

            <Grid item xs={5}>
              <Controller
                name="salary_to"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Salary To"
                    field={field}
                    fullWidth
                    type='number'
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, CURRENCY>
                    options={currency}
                    label="name"
                    inputLabel="Currentcy"
                    errors={errors}
                    // multiple={true}
                    field={field}
                    keySelect="id"
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
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default DetailJobModal
