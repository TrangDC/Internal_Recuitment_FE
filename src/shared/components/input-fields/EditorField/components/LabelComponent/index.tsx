import { LabelEditor } from '../../styles'
import { Span } from 'shared/components/Typography'

interface Props {
  focused: boolean
  label: string
  required: boolean
  value: string
}

const LabelWrapper = ({ focused, label, required, value }: Props) => {
  if (!label) return null;

  return (
    <LabelEditor
      className={`${focused && 'activeBox'} ${value && 'existValue'} editor__label`}
    >
      <label>
        {label} {required && <Span sx={{ color: '#FF316F' }}>*</Span>}
      </label>
    </LabelEditor>
  )
}

export default LabelWrapper
