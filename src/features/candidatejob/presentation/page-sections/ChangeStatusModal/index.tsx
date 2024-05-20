import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import {
  CustomTextField,
  CustomeButtonCancel,
} from 'shared/components/form/styles'
import { FormDataSchemaChangeStatus } from '../../providers/constants/schema'
import { baseInstance } from 'shared/interfaces'
import {
  CANDIDATE_STATUS,
  STATUS_CANDIDATE_HIRING,
} from '../../providers/constants'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import useChangeStatus from '../../providers/hooks/useChangeStatus'
import useTextTranslation from 'shared/constants/text'
import InputComponent from 'shared/components/form/inputComponent'

interface IChangeStatusModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
  id: string
  rowData?: CandidateJob
}

function ChangeStatusModal({
  open,
  setOpen,
  candidateId,
  rowData,
}: IChangeStatusModal) {
  const { onSubmit, useFormReturn } = useChangeStatus({
    defaultValues: { id: rowData?.id, feedback: '', attachments: [] },
    callbackSuccess: () => {
      setOpen(false)
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
        title={translation.MODULE_CANDIDATE_JOB.change_status}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomTextField
                label="Job name"
                size="small"
                value={rowData?.hiring_job_id}
                fullWidth
                focused
                required
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                label="Current status"
                size="small"
                //@ts-ignore
                value={CANDIDATE_STATUS?.[rowData?.status]?.text}
                fullWidth
                required
                focused
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<
                    FormDataSchemaChangeStatus,
                    baseInstance
                  >
                    options={STATUS_CANDIDATE_HIRING}
                    label="name"
                    inputLabel="New Status"
                    errors={errors}
                    field={field}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="feedback"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchemaChangeStatus>
                    errors={errors}
                    label="Feedback"
                    field={field}
                    fullWidth
                    multiline
                    minRows={4}
                    type="text"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <InputFileComponent
                    errors={errors}
                    field={field}
                    inputFileProps={{
                      accept: '.pdf',
                      regexString: '\\.pdf$',
                      maxFile: 5,
                      maxSize: 20,
                    }}
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

export default ChangeStatusModal
