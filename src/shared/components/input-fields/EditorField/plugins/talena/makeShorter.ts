import TalenaApiService from 'services/talena-api-services'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { Editor as TinyMCEEditor } from 'tinymce'
import openDialog from './openDialog'

const makeShorterPlugin = (editor: TinyMCEEditor) => {
  editor.ui.registry.addMenuItem('talenaMakeShorter', {
    text: 'Make shorter',
    icon: 'cut',
    onAction: async () => {
      const selectedText = editor.selection.getContent({ format: 'text' })
      openDialog(editor, selectedText, 'MAKE_SHORTER')
    },
  })
}

export default makeShorterPlugin
