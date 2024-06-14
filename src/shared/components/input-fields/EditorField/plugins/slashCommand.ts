import { Editor as TinyMCEEditor } from 'tinymce'
import { PLUGINS_NAME } from '../constant'

const insertActions = (editor: TinyMCEEditor) => {
  return [
    {
      type: 'separator',
      text: 'General',
    },
    {
      text: 'Heading 1',
      icon: 'h1',
      action: () => {
        editor.execCommand('mceInsertContent', false, '<h1>Heading 1</h1>')
        editor.selection.select(editor.selection.getNode())
      },
    },
    {
      text: 'Heading 2',
      icon: 'h2',
      action: () => {
        editor.execCommand('mceInsertContent', false, '<h2>Heading 2</h2>')
        editor.selection.select(editor.selection.getNode())
      },
    },
    {
      text: 'Heading 3',
      icon: 'h3',
      action: () => {
        editor.execCommand('mceInsertContent', false, '<h3>Heading 3</h3>')
        editor.selection.select(editor.selection.getNode())
      },
    },
    {
      type: 'separator',
    },
    {
      text: 'Bulleted list',
      icon: 'unordered-list',
      action: () => {
        editor.execCommand('InsertUnorderedList', false)
      },
    },
    {
      text: 'Numbered list',
      icon: 'ordered-list',
      action: () => {
        editor.execCommand('InsertOrderedList', false)
      },
    },
  ]
}

const pluginSlashCommand = (editor: TinyMCEEditor) => {
  editor.ui.registry.addAutocompleter(PLUGINS_NAME.SLASH_COMMANDS, {
    minChars: 0,
    columns: 1,
    trigger: '/',
    fetch: (pattern) => {
      const actions = insertActions(editor)

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
