import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../providers/constants/schema'
import { TEAM } from 'features/jobs/domain/interfaces'
import { baseInstance } from 'shared/interfaces'
import useCreateTeam from '../providers/hooks/useCreateTeam'
import { Team } from 'features/teams/domain/interfaces'

interface IEditTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Team
}

function EditTeamModal({ open, setOpen, rowData }: IEditTeamModal) {
  const { onSubmit, useFormReturn } = useCreateTeam({name: rowData?.name})
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const managers: baseInstance[] = [
    { id: 1, name: 'durinnguyen@techvify.com.vn' },
    { id: 2, name: 'arianne@techvify.com.vn' },
    { id: 3, name: 'helena@techvify.com.vn' },
    { id: 4, name: 'annapham@techvify.com.vn' },
    { id: 5, name: 'anniehoang@techvify.com.vn' },
  ]


  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header title="Edit team" setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Controller
                name="managers"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, TEAM>
                    options={managers}
                    label="name"
                    inputLabel="Team"
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                    multiple
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

export default EditTeamModal
