import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchemaBlackList } from '../../providers/constants/schema'
import useTextTranslation from 'shared/constants/text'
import useBlackListCandidate from '../../providers/hooks/useBlackListCandidate'

interface IBlackListCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  is_black_list?: boolean
  title: string
}

function BlackListCandidateModal({
  open,
  setOpen,
  id,
  is_black_list = true,
  title,
}: IBlackListCandidateModal) {
  const { onSubmit, useFormReturn } = useBlackListCandidate({
    callbackSuccess: () => setOpen(false),
    defaultValues: {
      id: id,
      is_black_list: is_black_list,
      note: '',
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
        title={title}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchemaBlackList>
                    errors={errors}
                    label={translation.COMMON.description}
                    field={field}
                    fullWidth
                    multiline
                    minRows={4}
                    type='text'
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

export default BlackListCandidateModal
