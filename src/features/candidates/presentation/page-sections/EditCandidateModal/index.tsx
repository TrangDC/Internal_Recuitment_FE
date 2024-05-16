import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchemaUpdate } from '../../providers/constants/schema'
import DatePickerComponent from 'shared/components/form/datePickerComponent'
import { Candidate } from 'features/candidates/domain/interfaces'
import useUpdateCandidate from '../../providers/hooks/useUpdateCandidate'
import { getInfoData } from 'shared/utils/utils'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'

interface IEditCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Candidate
}

function EditCandidateModal({ open, setOpen, rowData }: IEditCandidateModal) {
  const { onSubmit, useFormReturn } = useUpdateCandidate({
    callbackSuccess: () => setOpen(false),
    defaultValues: getInfoData({
      field: ['dob', 'email', 'phone', 'name', 'id'],
      object: {
        ...rowData,
        dob: new Date(rowData?.dob as string),
      },
    }),
  })

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormReturn

  const translation = useTextTranslation()

  const callbackSubmit = (reason: string) => {
    setValue('note', reason);
    onSubmit();
  }

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_CANDIDATES.edit_candidate}
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
                  <InputComponent<FormDataSchemaUpdate>
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
                  <InputComponent<FormDataSchemaUpdate>
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
                  <InputComponent<FormDataSchemaUpdate>
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
                  <DatePickerComponent<FormDataSchemaUpdate>
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
          {/* <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {translation.COMMON.save}
          </Button> */}

          <UpdateRecord callbackSubmit={callbackSubmit}>
            <Button
              type="button"
              variant="contained"
              color="primary"
            >
              {translation.COMMON.save}
            </Button>
          </UpdateRecord>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default EditCandidateModal
