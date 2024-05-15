import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import useCreateCandidate from '../../providers/hooks/useCreateCandidate'
import DatePickerComponent from 'shared/components/form/datePickerComponent'
import useTextTranslation from 'shared/constants/text'

interface ICreateCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateCandidateModal({ open, setOpen }: ICreateCandidateModal) {
  const { onSubmit, useFormReturn } = useCreateCandidate({
    callbackSuccess: () => setOpen(false),
  })
  const {
    control,
    formState: { errors },
  } = useFormReturn

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_CANDIDATES.add_new_candidate}
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
                    label={translation.COMMON.name}
                    field={field}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label={translation.COMMON.phone_number}
                    field={field}
                    fullWidth
                    required
                    type="number"
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
                    label={translation.COMMON.email}
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
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePickerComponent<FormDataSchema>
                    textFieldProps={{
                      fullWidth: true,
                      size: 'small',
                      required: true,
                    }}
                    errors={errors}
                    label={translation.COMMON.dob}
                    field={field}
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

export default CreateCandidateModal
