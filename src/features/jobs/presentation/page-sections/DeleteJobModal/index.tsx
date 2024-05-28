import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useDeleteJob from '../../providers/hooks/useDeleteJob'
import useTextTranslation from 'shared/constants/text'
import { Fragment, useState } from 'react'
import { t } from 'i18next'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import ModalConfirmType, { ModalType } from 'shared/components/modal/modalByType'
interface IDeleteJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DeleteJobModal({ open, setOpen, id }: IDeleteJobModal) {
  const [modal, setModal] = useState<ModalType>({
    content: '',
    type: 'failed',
    open: false,
    title: 'Failed to delete',
    onSubmit: () => {},
  })


  const { onSubmit, control, isPending, isValid } = useDeleteJob({
    callbackSuccess: () => {
      // setModal((prev) => ({
      //   ...prev,
      //   type: 'success',
      //   open: true,
      //   title: 'Delete successfully',
      //   onSubmit: () => setOpen(false)
      // }))
      setOpen(false)
    },
    defaultValues: {
      id: id,
      note: '',
    },
    callbackError: (data) => {
      setModal((prev) => ({
        ...prev,
        content: t(data?.message) as string,
        type: 'failed',
        open: true,
        title: 'Failed to delete',
      }))
    },
  })
  
  const handleSetOpen = (open: boolean) => {
    setModal((prev) => ({...prev, open}))
  }

  const translation = useTextTranslation()

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={translation.MODLUE_JOBS.delete_job}
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
       {modal.open && (
        <ModalConfirmType
          open={modal.open}
          setOpen={handleSetOpen}
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onSubmit={modal.onSubmit}
        />
      )}
    </Fragment>
  )
}

export default DeleteJobModal
