import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import useDeleteCandidate from '../../providers/hooks/useDeleteCandidate'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'

interface IDeleteCandidateModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DeleteCandidateModal({ open, setOpen, id }: IDeleteCandidateModal) {
  const { onSubmit, control, isPending, isValid } = useDeleteCandidate({
    callbackSuccess: () => setOpen(false),
    defaultValues: {
      id: id,
      note: '',
    }
  })

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODLUE_CANDIDATES.delete_candidate}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <FlexBox flexDirection={'column'} gap={2}>
          <FlexBox
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={1}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="note"
                render={({ field, fieldState }) => (
                  <FlexBox alignItems={'center'} flexDirection={'column'}>
                    <AppTextField
                      label={'Description'}
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      multiline
                      minRows={4}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>
        </FlexBox>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => setOpen(false)}
          >
            {translation.COMMON.cancel}
          </AppButton>
          <ButtonLoading
            variant="contained"
            size="small"
            disabled={isValid}
            handlesubmit={onSubmit}
            loading={isPending}
          >
            Submit
          </ButtonLoading>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default DeleteCandidateModal
