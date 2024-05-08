import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import useDeleteTeam from '../../providers/hooks/useDeleteTeam'
import useTextTranslation from 'shared/constants/text'

interface IDeleteTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DeleteTeamModal({ open, setOpen, id }: IDeleteTeamModal) {
  const { onSubmit, useFormReturn } = useDeleteTeam({
    callbackSuccess: () => setOpen(false),
    defaultValues: {
      id: id,
    },
  })
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_TEAMS.delete_team}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label={translation.COMMON.description}
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

export default DeleteTeamModal
