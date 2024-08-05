import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function CandidateSourceAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export type TypeCandidateSource =
  | 'EB'
  | 'REC'
  | 'hiring_platform'
  | 'reference'
  | 'headhunt'

export const CANDIDATE_SOURCE_STATE = {
  EB: 'eb',
  REC: 'rec',
  HIRING_PLATFORM: 'hiring_platform',
  REFERENCE: 'reference',
  HEADHUNT: 'headhunt',
}

export const CANDIDATE_SOURCE_LABEL = {
  eb: 'EB',
  rec: 'REC',
  hiring_platform: 'Hiring platform',
  reference: 'Reference',
  headhunt: 'Headhunt',
}

const options: IOption[] = [
  {
    label: 'EB',
    value: CANDIDATE_SOURCE_STATE.EB,
  },
  { label: 'REC', value: CANDIDATE_SOURCE_STATE.REC },
  { label: 'Hiring platform', value: CANDIDATE_SOURCE_STATE.HIRING_PLATFORM },
  { label: 'Reference', value: CANDIDATE_SOURCE_STATE.REFERENCE },
  {
    label: 'Headhunt',
    value: CANDIDATE_SOURCE_STATE.HEADHUNT,
  },
]

export default CandidateSourceAutoComplete
