import { BaseRecord } from 'shared/interfaces'
import { AutocompleteBase } from '../autocomplete-base'
import { IAutocompleteCommonProps } from '../autocomplete-base/interface'
import useRecInCharge from './hooks/useRecInCharge'

function RecInChargeAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple> & {
    hasAssigned?: boolean
    filter?: BaseRecord
  }
) {
  const { hasAssigned = true, filter = {}, ...autoCompleteProps } = props

  const { recInCharge } = useRecInCharge({ hasAssigned, filter })

  return (
    <AutocompleteBase<Multiple> {...autoCompleteProps} options={recInCharge} />
  )
}

export default RecInChargeAutoComplete
