import { Editor as TinyMCEEditor } from 'tinymce'
import openDialog from './openDialog'

const makeLongerPlugin = (editor: TinyMCEEditor) => {
  editor.ui.registry.addMenuItem('talenaMakeLonger', {
    text: 'Make longer',
    icon: 'align-left',
    onAction: async () => {
      const selectedText = editor.selection.getContent({ format: 'text' })
      openDialog(editor,selectedText , 'MAKE_LONGER')
    },
  })
}


export default makeLongerPlugin
