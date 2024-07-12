import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useUpdateEmail from 'features/email/hooks/useUpdateEmail'
import { IEditModal } from 'shared/interfaces'
import { BoxWrapperEditor } from 'features/email/shared/constants/styles/style'
import EditorBoxField from 'shared/components/input-fields/EditorField'
import useActionTable from 'features/email/hooks/useActionTable'
import { Fragment } from 'react/jsx-runtime'
import PreviewEmailModal from '../PreviewEmailModal'
import EventEmailAutocomplete from 'shared/components/autocomplete/event-email-autocomplete'
import AutoCompleteInput from 'features/email/shared/components/autocomplete-input'
import SendToAutocomplete from 'shared/components/autocomplete/send-to-autocomplete'

function EditEmailModal({ open, setOpen, id }: IEditModal) {
  const {
    actions,
    control,
    isValid,
    isPending,
    setValue,
    formState,
    form_values,
  } = useUpdateEmail({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })

  const { rowId, openPreview, setOpenPreview, handleOpenPreview, rowData } =
    useActionTable()
  const { onSubmit, getValidCc } = actions

  const translation = useTextTranslation()
  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return (
    <Fragment>
      <ConfirmableModalProvider
        actionCloseModal={setOpen}
        formState={formState}
      >
        <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
          <BaseModal.Header
            title={'Edit email template'}
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
                    name="event"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <EventEmailAutocomplete
                          multiple={false}
                          value={field.value}
                          onChange={(data) => {
                            field.onChange(data?.value)
                          }}
                          textFieldProps={{
                            label: 'Event',
                            required: true,
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>

              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="send_to"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <SendToAutocomplete
                          multiple={true}
                          value={field.value ?? []}
                          onChange={(data) => {
                            const ids = data.map((item) => item.value)
                            field.onChange(ids)
                          }}
                          textFieldProps={{
                            label: 'Send to',
                            required: true,
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>

              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="cc"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AutoCompleteInput
                          label="Cc"
                          value={getValidCc(field.value ?? [])}
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>

              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="subject"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <BoxWrapperEditor id="box__wrapper">
                          <EditorBoxField
                            label={'Email subject'}
                            required
                            value={field.value ?? ''}
                            onEditorChange={field.onChange}
                            pluginCustomize={['slashcommands']}
                            slash_command={['attribute']}
                            initProps={{
                              toolbar: false,
                              menubar: false,
                              content_style:
                                'body{margin:0; padding:10px 10px 5px; height:25px; white-space: nowrap} p { margin:0; padding: 0 ; height:25px }',
                            }}
                          />
                        </BoxWrapperEditor>

                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>
              
              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="content"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <EditorBoxField
                          label={'Email content'}
                          required
                          value={field.value ?? ''}
                          onEditorChange={field.onChange}
                          pluginCustomize={['slashcommands']}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>

              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="signature"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <EditorBoxField
                          label={'Email signature'}
                          value={field.value ?? ''}
                          onEditorChange={field.onChange}
                          pluginCustomize={['slashcommands']}
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
              <AppButton
                variant="outlined"
                size="small"
                onClick={() => {
                  handleOpenPreview(form_values)
                }}
              >
                Preview
              </AppButton>
              <UpdateRecord disabled={isValid} callbackSubmit={callbackSubmit}>
                <ButtonLoading
                  variant="contained"
                  size="small"
                  disabled={isValid}
                  handlesubmit={() => {}}
                  loading={isPending}
                >
                  Submit
                </ButtonLoading>
              </UpdateRecord>
            </FlexBox>
          </BaseModal.Footer>
        </BaseModal.Wrapper>
      </ConfirmableModalProvider>

      {openPreview && (
        <PreviewEmailModal
          open={openPreview}
          setOpen={setOpenPreview}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
    </Fragment>
  )
}

export default EditEmailModal
