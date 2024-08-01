import HiringTeam from 'shared/schema/database/hiring_team'
import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny12, Tiny12md } from 'shared/components/Typography'
import Mail from 'shared/components/icons/Mail'

interface User {
  name: string
  id: string
  work_email: string
}

function ApproveAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<User, Multiple>) {
  const { getAllUsers, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<User, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllUsers}
      getOptionLabel={getOptionLabel}
      keyName="name"
      name={name}
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      {...other}
    />
  )
}


function getOptionLabel(option: User) {
    return (
      <FlexBox flexDirection={'column'} gap={1}>
        <Tiny12>{option.name}</Tiny12>
        <FlexBox alignItems={'center'} gap={1}>
          <Mail sx={{ fontSize: '12px', color: '#82868C' }} />
          <Tiny12md color={'#82868C'}>{option.work_email}</Tiny12md>
        </FlexBox>
      </FlexBox>
    )
  }

export default ApproveAutoComplete
