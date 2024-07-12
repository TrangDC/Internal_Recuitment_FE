import { Editor as TinyMCEEditor } from 'tinymce'

import pluginSlashCommand from './slashCommand';
import { options_slash } from '../hooks/useGetSlashCommand';

const pluginCustomize = {
    slashcommands: pluginSlashCommand,
}

export type PluginName = keyof typeof pluginCustomize; 

export const addPluginCustomize = (editor: TinyMCEEditor, plugins: PluginName[], options_slash: options_slash) => {
    plugins.forEach((plugin) => {
        pluginCustomize[plugin](editor, options_slash)
    })
}
