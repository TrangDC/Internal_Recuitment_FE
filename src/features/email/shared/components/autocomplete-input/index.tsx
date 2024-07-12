import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from '@mui/material'

interface Props {
  label?: string
  value: string[]
  onChange: (value: string[], situation: AutocompleteChangeReason, option: AutocompleteChangeDetails<string> | undefined) => void
}

const AutoCompleteInput = ({ onChange, label, value }: Props) => {
  return (
    <Autocomplete
      disableListWrap
      size="small"
      options={[]}
      multiple={true}
      freeSolo={true}
      value={value}
      onChange={(e, value, situation, option) => {
        onChange(value, situation, option)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
      sx={{
        '& .MuiButtonBase-root.MuiChip-root': {
          backgroundColor: '#F1F9FF'
        },
        '& .MuiButtonBase-root.MuiChip-root span': {
          fontSize: '14px',
          color: '#121625',
          fontWeight: 500,
          lineHeight: '21px'
        }
      }}
    />
  )
}

export default AutoCompleteInput
