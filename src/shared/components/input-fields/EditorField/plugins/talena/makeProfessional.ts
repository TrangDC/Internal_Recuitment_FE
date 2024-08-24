import { Editor as TinyMCEEditor } from 'tinymce'
import openDialog from './openDialog'

const makeProfessionalPlugin = (editor: TinyMCEEditor) => {
  editor.ui.registry.addMenuItem('makeProfessional', {
    text: 'Be more Professional',
    icon: 'ai-prompt',
    onAction: async () => {
      const selectedText = editor.selection.getContent({ format: 'text' })
      openDialog(editor,selectedText , 'MAKE_MORE_PROFESSIONAL')
    },
  })
}


export default makeProfessionalPlugin
