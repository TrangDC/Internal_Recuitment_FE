import { useEffect, useRef, useState } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { Box, styled } from '@mui/material'
import { getBase64 } from 'shared/utils/utils'
import { Span } from '../Typography'

interface TinyProps extends IAllProps {
  label?: string
  initProps?: object
  defaultValue?: string,
  callbackChange?: (value: string) => void;
  required?: boolean,
}

const StyleEditorBox = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  border: '1px solid #dadce0',
  padding: '5px',
  position: 'relative',
  borderRadius: '4px',
  transition: '250ms',

  '&.activeEditor': {
    borderColor: '#1a73e8',
  },

  '& .tox-tinymce': {
    border: 'none',
  },

  '& .tox-statusbar': {
    display: 'none !important'
  },

  '& .tox-edit-area': {
    '&::before': {
      border: 'none !important',
      outline: 'none !important',
    },
  },
}))

const StyleBoxLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  top: '65px',
  left: '15px',
  color: '#80868b',
  transition: ' 250ms',

  '&.activeBox': {
    top: '-10px',
    padding: '0 10px',
    background: 'white',
    color: '#1a73e8',
    fontSize: '12px',
  },

  '&.existValue': {
    top: '-10px',
    padding: '0 10px',
    background: 'white',
    fontSize: '12px',
  },
}))

export default function EditorBox({
  label = '',
  initProps,
  defaultValue,
  callbackChange,
  required = false,
  ...props
}: TinyProps) {
  const [focused, setFocused] = useState<Boolean>(false)
  const editorRef = useRef(null)
  const [valueBox, setValueBox] = useState<string>('');

  useEffect(() => {
    defaultValue && setValueBox(defaultValue)
  }, [])

  return (
    <StyleEditorBox className={`${focused && 'activeEditor'}`}>
      {label && (
        <StyleBoxLabel
          className={`${focused && 'activeBox'} ${valueBox && 'existValue'}`}
        >
          <label>{label} {required && <Span sx={{color: 'red'}}>*</Span>}</label>
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
        value={valueBox}
        onEditorChange={(value) => {
          setValueBox(value);
          callbackChange && callbackChange(value)
        }}
        //@ts-ignore
        onInit={(_evt, editor) => (editorRef.current = editor)}
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
            'link image code | help',
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
