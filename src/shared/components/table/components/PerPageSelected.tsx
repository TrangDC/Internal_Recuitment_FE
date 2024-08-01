import { MenuItem, Select, SelectProps } from '@mui/material'
import { styled } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ArrowRadius from 'shared/components/icons/ArrowRadius'
import { Text13md } from 'shared/components/Typography'

const SelectTiny = styled(Select)(() => ({
  height: '26px',
  borderRadius: '4px',
  padding: '4px 8px 4px 8px',
  minWidth: '60px',
  borderColor: 'unset',
  backgroundColor: '#FCFCFC',
  '& .MuiSelect-select': {
    color: '#4D607A',
    padding: '0px',
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '21px',
    paddingRight: '4px !important',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'unset !important',
    borderWidth: '0 !important',
  },
}))

function PerPageSelected(props: SelectProps) {
  return (
    <FlexBox gap={2} padding={1} alignItems={'center'} height={40}>
      <Text13md color={'#4D607A'} lineHeight={'21px'}>
        Rows per page:
      </Text13md>
      <SelectTiny
        id="pagination-per-page"
        value={10}
        {...props}
        IconComponent={() => (
          <ArrowRadius sx={{ fill: 'grey.500', fontSize: '20px' }} />
        )}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </SelectTiny>
      <Text13md color={'#4D607A'} lineHeight={'21px'}>
        {`1–${props.value} of 30`}
      </Text13md>
    </FlexBox>
  )
}

export default PerPageSelected
