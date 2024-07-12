import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
} from '../autocomplete-base/interface'
import useSendTo from './hooks/useSendTo'

function SendToAutocomplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  const { options } = useSendTo()

  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export default SendToAutocomplete
