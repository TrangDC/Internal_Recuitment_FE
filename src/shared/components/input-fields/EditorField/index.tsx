import { useRef, useState } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { getBase64 } from 'shared/utils/utils'
import SkeletonField from '../SkeletonField'
import { Span } from 'shared/components/Typography'
import { PluginName, addPluginCustomize } from './plugins'
import { StyleBoxLabel, StyleEditorBox } from './styles'
import './styles/index.css'

interface TinyProps extends IAllProps {
  label?: string
  initProps?: object
  defaultValue?: string
  callbackChange?: (value: string) => void
  required?: boolean
  value: string
  loading?: boolean
  pluginCustomize?: PluginName[]
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
  ...props
}: TinyProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [focused, setFocused] = useState<Boolean>(false)
  const editorRef = useRef<Editor>(null)

  return loading ? (
    <SkeletonField height={100} />
  ) : (
    <StyleEditorBox className={`${focused && 'activeEditor'}`}>
      {label && (
        <StyleBoxLabel
          className={`${focused && 'activeBox'} ${value && 'existValue'}`}
        >
          <label>
            {label} {required && <Span sx={{ color: 'red' }}>*</Span>}
          </label>
        </StyleBoxLabel>
      )}
      <Editor
        apiKey={process.env.TINY_API_KEY}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        value={value}
        onInit={(_evt, editor) => {
          addPluginCustomize(editor, pluginCustomize)
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
          content_css: '',
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
    </StyleEditorBox>
  )
}
