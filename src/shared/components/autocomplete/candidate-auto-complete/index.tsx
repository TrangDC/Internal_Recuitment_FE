import FlexBox from 'shared/components/flexbox/FlexBox'
import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'
import { Tiny12, Tiny12md } from 'shared/components/Typography'
import Mail from 'shared/components/icons/Mail'
import { Phone } from '@mui/icons-material'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
}

function CandidateAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  filter,
  disabled,
  ...other
}: AutocompleteValueBackEndCommonProps<Candidate, Multiple>) {
  const { getAllCandidates, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Candidate, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllCandidates}
      getOptionLabel={getOptionLabel}
      keyName="name"
      filter={filter}
      name={name}
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      disabled={disabled}
      {...other}
    />
  )
}

function getOptionLabel(option: Candidate) {
  return (
    <FlexBox flexDirection={'column'} gap={1}>
      <Tiny12>{option.name}</Tiny12>
      <FlexBox alignItems={'center'} gap={1}>
        <Mail sx={{ fontSize: '12px', color: '#82868C' }} />
        <Tiny12md color={'#82868C'}>{option.email}</Tiny12md>
      </FlexBox>
      <FlexBox alignItems={'center'} gap={1}>
        <Phone sx={{ fontSize: '12px', color: '#82868C' }} />
        <Tiny12md color={'#82868C'}>{option.phone}</Tiny12md>
      </FlexBox>
    </FlexBox>
  )
}

export default CandidateAutoComplete
