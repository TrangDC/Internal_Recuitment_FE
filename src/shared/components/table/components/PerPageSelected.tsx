import { MenuItem, Select, SelectProps } from '@mui/material'
import { styled } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md } from 'shared/components/Typography'

const SelectTiny = styled(Select)(() => ({
  height: '20px',
  border: 'none',
}))

function PerPageSelected(props: SelectProps) {
  return (
    <FlexBox gap={2}>
      <FlexBox gap={1}>
        <Text13md>Rows per page:</Text13md>
        <SelectTiny id="pagination-per-page" value={10} {...props}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectTiny>
      </FlexBox>
      <Text13md>1–10 of 30</Text13md>
    </FlexBox>
  )
}

export default PerPageSelected
