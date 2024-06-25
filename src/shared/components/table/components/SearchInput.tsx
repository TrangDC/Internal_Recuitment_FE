import { IconButton, InputBase, InputBaseProps, styled } from '@mui/material'
import { CSSProperties } from '@mui/styled-engine'
import { forwardRef } from 'react'
import SearchIcon from 'shared/components/icons/SearchIcon'

// styled component
const StyledInputBase = styled(InputBase)<{ bordered: any }>(
  ({ theme, bordered }) => ({
    height: 40,
    fontSize: 14,
    width: '100%',
    maxWidth: 400,
    fontWeight: 500,
    padding: '0 8px',
    borderRadius: '4px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    border: bordered ? `1px solid ${theme.palette.grey[300]}` : 'none',
    [theme.breakpoints.down(500)]: { maxWidth: '100%' },
    '::placeholder': { color: theme.palette.text.disabled },
  })
)

// ------------------------------------------------------------
type SearchInputProps = {
  bordered?: boolean
  icon_style?: CSSProperties
  onEnter?: (value: string) => void
  onSearch?: () => void
}
// ------------------------------------------------------------

const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps & InputBaseProps
>((props, ref) => {
  const {
    icon_style = {},
    bordered = true,
    onEnter,
    onSearch,
    ...other
  } = props
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter') return
    if (onEnter) onEnter(e.currentTarget.value)
  }
  return (
    <StyledInputBase
      bordered={bordered ? 1 : 0}
      inputRef={ref}
      onKeyDown={handleKeyDown}
      endAdornment={
        <IconButton>
          <SearchIcon
            onClick={onSearch}
            sx={{
              fontSize: 16,
              color: 'text.disabled',
              ...icon_style,
              cursor: 'pointer',
            }}
          />
        </IconButton>
      }
      {...other}
    />
  )
})

export default SearchInput
