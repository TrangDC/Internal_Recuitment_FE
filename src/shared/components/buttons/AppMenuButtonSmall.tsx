import { Button, ButtonProps, Menu, MenuItem, styled } from '@mui/material'
import React, { ReactNode, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Text13md } from '../Typography'

type AppMenuButtonSmallProps = {
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
    padding: '10px 12px',
    gap: '10px',
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary[300]}`,
    backgroundColor: theme.palette.primary[50],
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '3px 8px',
    color: theme.palette.primary[600],
}))

function AppMenuButtonSmall({ options, title, buttonProps }: AppMenuButtonSmallProps) {
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
            <ButtonStyled
                id="menu-button"
                ref={buttonRef}
                aria-controls={open ? 'menu-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                // variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                {...buttonProps}
            >
                {title}
            </ButtonStyled>
            <Menu
                id="menu-options"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '.MuiList-root': {
                        width: `${Number(buttonRef.current?.clientWidth) + 4}px`,
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

export default AppMenuButtonSmall
