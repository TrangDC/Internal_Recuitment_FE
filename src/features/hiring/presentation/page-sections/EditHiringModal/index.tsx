import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { baseInstance } from 'shared/interfaces'
import useCreateTeam from '../../providers/hooks/useCreateHiring'
import { Hiring } from 'features/hiring/domain/interfaces'
import { useState } from 'react'
import { Team } from 'features/teams/domain/interfaces'

interface IEditHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Hiring
}

function EditHiringModal({ open, setOpen }: IEditHiringModal) {
  const { onSubmit, useFormReturn } = useCreateTeam()
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const [teams, setTeams] = useState<Team[]>([])
  // useEffect(() => {
  //   new Promise((resolve, reject) => {
  //     resolve(mockApiGetListTeam())
  //   }).then((response: any) => {
  //     setTeams(response.sortData)
  //   })
  // }, [])

  const position: baseInstance[] = [
    { value: "1", name: 'UI/UX Designer' },
    { value: "2", name: 'Software Engineer' },
    { value: "3", name: 'Sale' },
    { value: "4", name: 'Front-end Developer' },
    { value: "5", name: 'Back-end Developer' },
  ]


  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="Edit hiring team" setOpen={setOpen}></BaseModal.Header>
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
                  <AutoCompleteComponent<FormDataSchema, Team>
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

export default EditHiringModal
