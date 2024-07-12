import { Editor as TinyMCEEditor } from 'tinymce'
import { PLUGINS_NAME } from '../constant'
import { handleFilterData } from '../utils'
import { options_slash } from '../hooks/useGetSlashCommand'
import { generateAttributes } from '../actions/attributes'
import { generateLink } from '../actions/link'

const pluginSlashCommand = (editor: TinyMCEEditor, options_slash: options_slash) => {
  editor.ui.registry.addAutocompleter(PLUGINS_NAME.SLASH_COMMANDS, {
    minChars: 0,
    columns: 1,
    trigger: '/',
    fetch: (pattern) => {
      const attribute_data = handleFilterData(generateAttributes(editor, options_slash.attribute), pattern)
      const link_data = handleFilterData(generateLink(editor, options_slash.link), pattern)

      const actions = [
        ...attribute_data,
        ...link_data,
      ]

      return new Promise((resolve) => {
        const results = actions.map((action) => ({
          meta: action,
          text: action.text,
          icon: action.icon,
          value: action.text,
          type: action.type,
        }))
        //@ts-ignore
        resolve(results)
      })
    },
    onAction: (autocompleteApi, rng, action, meta) => {
      editor.selection.setRng(rng)
      editor.execCommand('Delete')
      meta.action()
      autocompleteApi.hide()
    },
  })
}

export default pluginSlashCommand
