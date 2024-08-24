import TalenaApiService, { CommandRewrite } from 'services/talena-api-services'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { Editor as TinyMCEEditor } from 'tinymce'

const loading = (editor: TinyMCEEditor) => {
  const loadingNotification = editor.notificationManager.open({
    text: 'loading...',
    type: 'info',
    timeout: 0,
  })
  return loadingNotification
}

const openDialog = async (
  editor: TinyMCEEditor,
  initialText: string,
  command: CommandRewrite
) => {
  const isloading = loading(editor)
  const data = await TalenaApiService.rewrite({
    command,
    text: initialText,
  })
  isloading.close()
  if (isRight(data)) {
    const text = unwrapEither(data)
    editor.windowManager.open({
      title: 'AI Rewrite',
      body: {
        type: 'panel',
        items: [
          {
            type: 'htmlpanel',
            html: '<h2>Do you want to apply this change?</h2>',
          },
          {
            type: 'htmlpanel',
            html: `<p>${text}</p>`,
          },
        ],
      },
      initialData: {
        lengthSlider: 10,
      },
      buttons: [
        {
          type: 'cancel',
          name: 'closeButton',
          text: 'Cancel',
        },
        {
          type: 'custom',
          name: 'rewriteButton',
          text: 'Rewrite',
          buttonType: 'secondary',
        },
        {
          type: 'submit',
          name: 'submitButton',
          text: 'Apply',
          buttonType: 'primary',
        },
      ],
      onSubmit: (api) => {
        editor.selection.setContent(text)
        api.close()
      },
      onAction: async (api, details) => {
        if (details.name === 'rewriteButton') {
          api.close() // Close the current dialog
          const selectedText = editor.selection.getContent({ format: 'text' })
          await openDialog(editor, selectedText, command)
        }
      },
    })
  } else {
    editor.notificationManager.open({
      text: 'Failed to rewrite the text',
      type: 'error',
    })
  }
}

export default openDialog
