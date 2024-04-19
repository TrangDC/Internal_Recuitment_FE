import BaseModal from 'shared/components/modal'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Managers } from 'features/teams/domain/interfaces'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { schema, FormDataSchema } from '../../constants/schema'

interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      team_name: '',
      managers: [],
    },
  })

  //watch values
  useWatch({
    control,
    name: ['managers'],
  })

  const onSubmit = (data: any) => {
    console.log('data', data)
  }

  const top100Films: Managers[] = [
    { name: 'The Shawshank Redemption', id: 1, email: 'test@gmail.com' },
    { name: 'The Godfather', id: 2, email: 'test@gmail.com' },
    { name: 'The Godfather: Part II', id: 3, email: 'test@gmail.com' },
    { name: 'The Dark Knight', id: 4, email: 'test@gmail.com' },
    { name: '12 Angry Men', id: 5, email: 'test@gmail.com' },
    { name: "Schindler's List", id: 6, email: 'test@gmail.com' },
    { name: 'Pulp Fiction', id: 7, email: 'test@gmail.com' },
  ]

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="New team" setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain maxHeight='500px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="team_name"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Team Name"
                    field={field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="managers"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Managers>
                    options={top100Films}
                    label="name"
                    inputLabel="Manager's"
                    errors={errors}
                    multiple={true}
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
          <CustomeButtonCancel type="button" variant="contained" >
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

export default CreateTeamModal
