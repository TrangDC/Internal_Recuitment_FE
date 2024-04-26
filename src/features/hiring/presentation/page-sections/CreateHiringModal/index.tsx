import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { TEAM } from 'features/jobs/domain/interfaces'
import { baseInstance } from 'shared/interfaces'
import useCreateTeam from '../../providers/hooks/useCreateHiring'
import { Hiring } from 'features/hiring/domain/interfaces'
import { useEffect, useState } from 'react'
import { mockApiGetListTeam } from 'features/jobs/presentation/providers/hooks/useJobTable'

interface ICreateHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateHiringModal({ open, setOpen }: ICreateHiringModal) {
  const { onSubmit, useFormReturn } = useCreateTeam()
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const [teams, setTeams] = useState<TEAM[]>([])
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetListTeam())
    }).then((response: any) => {
      setTeams(response.sortData)
    })
  }, [])

  const position: baseInstance[] = [
    { id: 1, name: 'UI/UX Designer' },
    { id: 2, name: 'Software Engineer' },
    { id: 3, name: 'Sale' },
    { id: 4, name: 'Front-end Developer' },
    { id: 5, name: 'Back-end Developer' },
  ]


  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="Add a new hiring team" setOpen={setOpen}></BaseModal.Header>
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
                    label="Name"
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
                name="email"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Email"
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
                name="position"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={position}
                    label="name"
                    inputLabel="Position"
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <CustomeButtonCancel type="button" variant="contained" onClick={() => setOpen(false)}>
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

export default CreateHiringModal
