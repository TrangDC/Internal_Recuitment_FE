import { useMemo } from 'react'
import { AutocompleteBase } from '../autocomplete-base'
import { IAutocompleteCommonProps } from '../autocomplete-base/interface'
import useSendTo, { SEND_TO_VALUE } from './hooks/useSendTo'

interface SendToProps {
  include?: string[]
}

function SendToAutocomplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple> & SendToProps
) {
  const { include = [], ...autoCompleteProps } = props

  const { options_fixed, options_role } = useSendTo()
  const options = useMemo(() => {
    let result = options_fixed.filter((fixed) => {
      return include.includes(fixed.value)
    })

    if (include.includes(SEND_TO_VALUE.role))
      result = [...result, ...options_role]
    return result
  }, [include])

  return <AutocompleteBase<Multiple> {...autoCompleteProps} options={options} />
}

export default SendToAutocomplete
