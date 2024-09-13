import { MenuItem, Select, styled } from '@mui/material'
import Vector from '../icons/Vector'

const SelectStyle = styled(Select)(() => ({
  height: '26px',
  borderRadius: '4px',
  padding: '4px 8px 4px 12px',
  minWidth: '81px',
  borderColor: '#E3E6EB',
  backgroundColor: '#FCFCFC',
  '& .MuiSelect-select': {
    color: '#0B0E1E',
    padding: '0px',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '21px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E3E6EB',
  },
}))

interface TinySelectedProps<T> {
  selectItems: SelectItems[]
  onChange: (value: T) => void
  value: string
}

interface SelectItems {
  value: string
  title: string
}

function TinySelected<T>({
  selectItems = [],
  onChange,
  value,
}: TinySelectedProps<T>) {
  return (
    <SelectStyle
      labelId="tiny-selected"
      id="tiny-selected-id"
      size="small"
      IconComponent={() => <Vector sx={{ fontSize: '11px' }} />}
      onChange={(e) => {
        const value = e.target.value as T
        onChange(value)
      }}
      value={value}
    >
      {selectItems.map((item) => (
        <MenuItem value={item.value} key={item.value} data-title={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </SelectStyle>
  )
}

export default TinySelected
