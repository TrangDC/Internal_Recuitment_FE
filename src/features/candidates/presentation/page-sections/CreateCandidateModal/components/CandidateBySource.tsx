import EBAutoComplete from 'shared/components/autocomplete/EB-auto-complete'
import RECAutoComplete from 'shared/components/autocomplete/REC-auto-complete'
import { CANDIDATE_SOURCE_STATE } from 'shared/components/autocomplete/candidate-source-auto-complete'
import HiringPlatformAutoComplete from 'shared/components/autocomplete/hiring-platform-auto-complete'
import AppTextField from 'shared/components/input-fields/AppTextField'

interface Props {
  source: 'EB' | 'REC' | 'hiring_platform' | 'reference' | 'headhunt' 
  name: string
  value: string
  onChange: (value: any) => void
  required?: boolean
}

const CandidateBySource = ({ source, name, value, onChange, required = false }: Props) => {
  if(!source) {
    return null;
  }

  switch (source) {
    case CANDIDATE_SOURCE_STATE.EB:
      return (
        <EBAutoComplete
          value={value}
          onChange={(recruit) => {
            onChange(recruit?.value)
          }}
          multiple={false}
          textFieldProps={{
            label: `Recruit Channel`,
            required: required
          }}
        />
      )
    case CANDIDATE_SOURCE_STATE.REC:
      return (
        <RECAutoComplete
          value={value}
          onChange={(recruit) => {
            onChange(recruit?.value)
          }}
          multiple={false}
          textFieldProps={{
            label: `Recruit Channel`,
            required: required
          }}
        />
      )
    case CANDIDATE_SOURCE_STATE.HIRING_PLATFORM:
      return (
        <HiringPlatformAutoComplete
          value={value}
          onChange={(recruit) => {
            onChange(recruit?.value)
          }}
          multiple={false}
          textFieldProps={{
            label: `Recruit platform`,
            required: required
          }}
        />
      )
    case CANDIDATE_SOURCE_STATE.REFERENCE:
      return (
        <AppTextField
          label={'Referrer'}
          required={required}
          size="small"
          fullWidth
          value={value}
          onChange={onChange}
        />
      )
    case CANDIDATE_SOURCE_STATE.HEADHUNT:
      return (
        <AppTextField
          label={'Headhunter'}
          required={required}
          size="small"
          fullWidth
          value={value}
          onChange={onChange}
        />
      )
    default:
      throw new Error('Invalid source!')
  }
}

export default CandidateBySource
