import { Editor as TinyMCEEditor } from 'tinymce'
import { AutocompleterItemSpec } from '../../types'
import { slash_command_record } from '../../hooks/useGetSlashCommand'

const renderAttributes = (value: string) => {
  return `{{ ${value} }}`
}

export const generateAttributes = (editor: TinyMCEEditor, option_slash: slash_command_record[]): AutocompleterItemSpec[] => {
  const options = option_slash.map((slash_command) => {
    return {
      text: slash_command.value,
      icon: 'user',
      action: () => {
        editor.execCommand('mceInsertContent', false, renderAttributes(slash_command.key)
        )
      },
    }
  })
  
  return [
    {
      type: 'separator',
      text: 'Attributes',
    },
    ...options
  ]
}