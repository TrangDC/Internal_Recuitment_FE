import { Editor as TinyMCEEditor } from 'tinymce'
import { AutocompleterItemSpec } from '../../types'
import { slash_command_record } from '../../hooks/useGetSlashCommand'

const renderLink = (key: string, value: string) => {
  return `<a href="{{ ${key} }}">${value}</a> `
}

export const generateLink = (editor: TinyMCEEditor, option_slash: slash_command_record[]): AutocompleterItemSpec[] => {
  const options = option_slash.map((slash_command) => {
    return {
      text: slash_command.value,
      icon: 'user',
      action: () => {
        editor.execCommand('mceInsertContent', false, renderLink(slash_command.key, slash_command.value)
        )
      },
    }
  })
  
  return [
    {
      type: 'separator',
      text: 'Link',
    },
    ...options
  ]
}