import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useCreateEmail from 'features/email/hooks/useCreateEmail'
import { ICreateModal } from 'shared/interfaces'
import EditorBoxField from 'shared/components/input-fields/EditorField'
import { BoxWrapperEditor } from 'features/email/shared/constants/styles/style'
import useActionTable from 'features/email/hooks/useActionTable'
import { Fragment } from 'react/jsx-runtime'
import PreviewEmailModal from '../PreviewEmailModal'
import EventEmailAutocomplete, {
  EVENT_EMAIL_ENUM,
} from 'shared/components/autocomplete/event-email-autocomplete'
import AutoCompleteInput from 'features/email/shared/components/autocomplete-input'
import SendToAutocomplete from 'shared/components/autocomplete/send-to-autocomplete'
import { useMemo } from 'react'
import {
  SEND_TO_BY_EVENT,
  SLASH_COMMAND_BY_EVENT,
} from 'features/email/shared/constants'
import { SLASH_COMMAND_TYPE } from 'shared/components/input-fields/EditorField/hooks/useGetSlashCommand'

function CreateEmailModal({ open, setOpen }: ICreateModal) {
  const {
    onSubmit,
    control,
    isPending,
    isValid,
    formState,
    form_values,
    actions,
    watch,
  } = useCreateEmail({
    callbackSuccess: () => {
      setOpen(false)
    },
  })
  const { getValidCc, resetSendTo } = actions

  const { rowId, openPreview, setOpenPreview, handleOpenPreview, rowData } =
    useActionTable()
  const translation = useTextTranslation()
  const event_selected = watch('event')

  const include_sendTo = useMemo(() => {
    return event_selected ? SEND_TO_BY_EVENT[event_selected] : []
  }, [event_selected])

  const include_slashCommand = useMemo(() => {
    return event_selected ? SLASH_COMMAND_BY_EVENT[event_selected] : []
  }, [event_selected])

  return (
    <Fragment>
      <ConfirmableModalProvider
        actionCloseModal={setOpen}
        formState={formState}
      >
        <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
          <BaseModal.Header
            title={'Create email template'}
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
                            resetSendTo()
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
                          value={field.value}
                          include={include_sendTo}
                          disabled={!event_selected}
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
                            onEditorChange={(value) => {
                              field.onChange(value)
                            }}
                            pluginCustomize={['slashcommands']}
                            slash_command={['attribute']}
                            initProps={{
                              toolbar: false,
                              menubar: false,
                              content_style:
                                'body{margin:0; padding:10px 10px 5px; height:25px; white-space: nowrap} p { margin:0; padding: 0 ; height:25px }',
                            }}
                            event_filter={event_selected as EVENT_EMAIL_ENUM}
                            attribute_command={
                              include_slashCommand as SLASH_COMMAND_TYPE
                            }
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
                          onEditorChange={(value) => {
                            field.onChange(value)
                          }}
                          pluginCustomize={['slashcommands']}
                          attribute_command={
                            include_slashCommand as SLASH_COMMAND_TYPE
                          }
                          event_filter={event_selected as EVENT_EMAIL_ENUM}
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
                          onEditorChange={(value) => {
                            field.onChange(value)
                          }}
                          pluginCustomize={['slashcommands']}
                          attribute_command={
                            include_slashCommand as SLASH_COMMAND_TYPE
                          }
                          event_filter={event_selected as EVENT_EMAIL_ENUM}
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
                  //@ts-ignore
                  handleOpenPreview(form_values)
                }}
              >
                Preview
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

export default CreateEmailModal
