import { AutocompleteBase } from '../autocomplete-base'
import { IAutocompleteCommonProps } from '../autocomplete-base/interface'
import useRecInCharge from './hooks/useRecInCharge'

function RecInChargeAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  const { ...autoCompleteProps } = props

  const { recInCharge } = useRecInCharge()

  return (
    <AutocompleteBase<Multiple> {...autoCompleteProps} options={recInCharge} />
  )
}

export default RecInChargeAutoComplete
