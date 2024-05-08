import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import useCreateTeam from '../../providers/hooks/useCreateTeam'
import { Member } from 'features/teams/domain/interfaces'
import useSelectMember from 'shared/hooks/graphql/useSelectMember'
import useTextTranslation from 'shared/constants/text'

interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  const { onSubmit, useFormReturn } = useCreateTeam({
    callbackSuccess: () => {
      setOpen(false)
    },
  })
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const { members } = useSelectMember()
  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_TEAMS.add_a_new_team}
        setOpen={setOpen}
      ></BaseModal.Header>
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
                    label={translation.COMMON.name}
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
                name="members"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Member>
                    options={members}
                    label="work_email"
                    inputLabel={translation.MODLUE_TEAMS.team_manager}
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
          <CustomeButtonCancel
            type="button"
            variant="contained"
            onClick={() => setOpen(false)}
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

export default CreateTeamModal
