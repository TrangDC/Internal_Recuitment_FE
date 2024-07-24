import { useRef, useState } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { getBase64 } from 'shared/utils/utils'
import SkeletonField from '../SkeletonField'
import { PluginName, addPluginCustomize } from './plugins'
import { EditorBoxWrapper } from './styles'
import './styles/index.css'
import LabelWrapper from './components/LabelComponent'
import PortalComponent from './components/PortalComponent'
import useGetSlashCommand, {
  SLASH_COMMAND_TYPE,
} from './hooks/useGetSlashCommand'
import { EVENT_EMAIL_ENUM } from 'shared/components/autocomplete/event-email-autocomplete'

interface TinyProps extends IAllProps {
  label?: string
  initProps?: object
  defaultValue?: string
  callbackChange?: (value: string) => void
  required?: boolean
  value: string
  loading?: boolean
  pluginCustomize?: PluginName[]
  slash_command?: Array<'attribute' | 'link'>
  attribute_command?: SLASH_COMMAND_TYPE
  event_filter?: EVENT_EMAIL_ENUM
}

export default function EditorBoxField({
  label = '',
  initProps,
  defaultValue,
  callbackChange,
  required = false,
  value,
  loading,
  pluginCustomize = [],
  slash_command = ['attribute', 'link'],
  attribute_command = [],
  event_filter = 'updating_interview',
  ...props
}: TinyProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [focused, setFocused] = useState<boolean>(false)
  const editorRef = useRef<Editor>(null)

  const { options_slash } = useGetSlashCommand({
    type: slash_command,
    attribute_command: attribute_command,
    filter: {
      event: event_filter ? event_filter : 'updating_interview',
    },
  })

  return loading ? (
    <SkeletonField height={100} />
  ) : (
    <EditorBoxWrapper
      className={`${focused && 'activeEditor'} editor__wrapper`}
    >
      <LabelWrapper
        focused={focused}
        label={label}
        required={required}
        value={value}
      />
      <PortalComponent is_portal={isFullScreen}>
        <Editor
          key={JSON.stringify(options_slash)}
          apiKey={process.env.TINY_API_KEY}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
          value={value}
          onInit={(_evt, editor) => {
            if (isFullScreen) {
              editor.execCommand('mceFullScreen')
            }

            addPluginCustomize(editor, pluginCustomize, options_slash)
            //@ts-ignore
            editorRef.current = editor
            editor.on('FullscreenStateChanged', (e) => {
              setIsFullScreen(e.state)
            })
          }}
          init={{
            height: 200,
            menubar: false,
            branding: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
              'image',
              'code',
            ],
            toolbar:
              'undo redo | blocks fontfamily fontsize | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'link image code fullscreen | help',
            images_upload_handler: async (blobInfo) => {
              const { blob } = blobInfo

              return new Promise((resolve, reject) => {
                resolve(getBase64(blob()))
              })
            },
            automatic_uploads: true,
            ...initProps,
          }}
          {...props}
        />
      </PortalComponent>
    </EditorBoxWrapper>
  )
}
