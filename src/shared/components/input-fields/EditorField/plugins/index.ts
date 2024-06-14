import { Editor as TinyMCEEditor } from 'tinymce'

import pluginSlashCommand from './slashCommand';

const pluginCustomize = {
    slashcommands: pluginSlashCommand,
}

export type PluginName = keyof typeof pluginCustomize; 

export const addPluginCustomize = (editor: TinyMCEEditor, plugins: PluginName[]) => {
    plugins.forEach((plugin) => {
        pluginCustomize[plugin](editor)
    })
}
