import {
  ButtonProps,
  ClickAwayListener,
  Box,
  InputAdornment,
  TextFieldProps,
} from '@mui/material'
import React from 'react'
import { PopperStyled, TextFieldPopper, TypographyStyled } from '../style'

type ButtonFilterProps = {
  inputLabel: string
  tag: React.ReactNode
  node: React.ReactNode
  textFieldProps?: TextFieldProps
}

const PopperWrapper = ({
  inputLabel,
  tag,
  node,
  textFieldProps,
  ...props
}: ButtonFilterProps & ButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <Box>
        <TextFieldPopper
          size="small"
          InputProps={{
            readOnly: true,
            onClick: handleClick,
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ display: 'flex', gap: 1 }}>{tag}</Box>
              </InputAdornment>
            ),
          }}
          {...textFieldProps}
        />

        <PopperStyled
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          <TypographyStyled>{node}</TypographyStyled>
        </PopperStyled>
      </Box>
    </ClickAwayListener>
  )
}

export default PopperWrapper
