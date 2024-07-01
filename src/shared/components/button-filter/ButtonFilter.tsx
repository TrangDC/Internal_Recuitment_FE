import {
  Button,
  ButtonProps,
  Typography,
  Popper,
  ClickAwayListener,
  styled,
  Box,
  TypographyProps,
} from '@mui/material'
import React from 'react'
import DownIcon from '../icons/DownIcon'
import { SpanText } from '../form/styles'

const ButtonFilterStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  boxShadow: 'none',
  fontSize: '12px',
  height: '20px',
  WebkitBoxPack: 'start',
  justifyContent: 'flex-start',
  padding: '0px 5px',
  border: 'none',

  '& span': {
    color: theme.palette.primary[800],
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '15.85px',
  },

  '&:hover': {
    border: 'none',
    backgroundColor: 'white',
  },
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  width: '285px',
  backgroundColor: theme.palette.primary.light,
  boxShadow:
    'rgba(40, 41, 61, 0.04) 0px 2px 4px 0px, rgba(96, 97, 112, 0.16) 0px 8px 16px 0px',

  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
}))

const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
}))


type ButtonFilterProps = {
  inputLabel: string
  node: React.ReactNode
  typographyProps?: TypographyProps
}

const ButtonFilter = ({
  inputLabel,
  node,
  typographyProps,
  ...props
}: ButtonFilterProps & ButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <Box sx={{ width: 'auto' }}>
        <ButtonFilterStyled
          {...props}
          onClick={handleClick}
          endIcon={<DownIcon />}
        >
          <SpanText>{inputLabel}</SpanText>
        </ButtonFilterStyled>
        <PopperStyled open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <TypographyStyled sx={{ p: 1, pr: 2, pl: 2 }} {...typographyProps}>
            {node}
          </TypographyStyled>
        </PopperStyled>
      </Box>
    </ClickAwayListener>
  )
}

export default ButtonFilter
