import { Button, ButtonProps, Menu, MenuItem, styled } from '@mui/material'
import React, { ReactNode, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Text13md } from '../Typography'

type AppMenuButtonProps = {
  options: ButtonOption[]
  title: string
  buttonProps?: ButtonProps
}

type ButtonOption = {
  title: string
  onClick: () => void
  Icon: ReactNode
}

const MenuItemStyled = styled(MenuItem)(() => ({
  padding: '10px 12px 10px 16px',
  gap: '10px',
}))

function AppMenuButton({ options, title, buttonProps }: AppMenuButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="menu-button"
        ref={buttonRef}
        aria-controls={open ? 'menu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        {...buttonProps}
      >
        {title}
      </Button>
      <Menu
        id="menu-options"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiList-root': {
            width: `${buttonRef.current?.clientWidth}px`,
          },
        }}
      >
        {options.map(({ Icon, title, onClick }) => (
          <MenuItemStyled
            onClick={() => {
              onClick()
              handleClose()
            }}
            disableRipple
          >
            {Icon}
            <Text13md color={'text.900'}>{title}</Text13md>
          </MenuItemStyled>
        ))}
      </Menu>
    </div>
  )
}

export default AppMenuButton
