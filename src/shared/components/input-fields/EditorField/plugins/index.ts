import { Editor as TinyMCEEditor } from 'tinymce'

import pluginSlashCommand from './slashCommand'
import { options_slash } from '../hooks/useGetSlashCommand'
import makeLongerPlugin from './talena/makeLonger'
import makeShorterPlugin from './talena/makeShorter'
import correctGrammarPlugin from './talena/correctGrammar'
import makeProfessionalPlugin from './talena/makeProfessional'

const pluginCustomize = {
  slashcommands: pluginSlashCommand,
  talenaMakeLonger: makeLongerPlugin,
  talenaMakeShorter: makeShorterPlugin,
  correctGrammar: correctGrammarPlugin,
  makeProfessional:makeProfessionalPlugin
}

export type PluginName = keyof typeof pluginCustomize

export const addPluginCustomize = (
  editor: TinyMCEEditor,
  plugins: PluginName[],
  options_slash: options_slash
) => {
  plugins.forEach((plugin) => {
    pluginCustomize[plugin](editor, options_slash)
  })
}
