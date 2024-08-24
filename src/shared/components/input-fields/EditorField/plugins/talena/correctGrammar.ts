import { Editor as TinyMCEEditor } from 'tinymce'
import openDialog from './openDialog'

const correctGrammarPlugin = (editor: TinyMCEEditor) => {
  editor.ui.registry.addMenuItem('correctGrammar', {
    text: 'Fix spell & grammar',
    icon: 'format-painter',
    onAction: async () => {
      const selectedText = editor.selection.getContent({ format: 'text' })
      openDialog(editor,selectedText , 'CORRECT_GRAMMAR')
    },
  })
}


export default correctGrammarPlugin
