import {
  AppBar,
  Box,
  ClickAwayListener,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material'
import { SettingsContext } from 'contexts/settingsContext'
import { FC, Fragment, useContext } from 'react'
import ProfilePopover from './popovers/ProfilePopover'
// import { themeSettingsTypes } from 'shared/theme'

// ------------------------------------------------
type DashboardHeaderProps = {
  setShowSideBar: () => void
  setShowMobileSideBar: () => void
}
// ------------------------------------------------

// custom styled components
const DashboardHeaderRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  boxShadow: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
}))

const StyledToolBar = styled(Toolbar)(() => ({
  '@media (min-width: 0px)': {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 'auto',
  },
}))

// const StyledIconButton = styled(IconButton)(({ theme }) => ({
//   '&:hover': { backgroundColor: theme.palette.action.hover },
// }))

const ToggleIcon = styled(Box)<{ width?: number }>(({ theme, width }) => ({
  height: 3,
  margin: '5px',
  marginLeft: 0,
  width: width || 25,
  borderRadius: '10px',
  transition: 'width 0.3s',
  backgroundColor: theme.palette.primary.main,
}))

const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
  const { setShowMobileSideBar } = props

  // const [openSearchBar, setSearchBar] = useState(false)
  const { settings, saveSettings } = useContext(SettingsContext)
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down(1200))

  // const handleChangeTheme = (value: 'light' | 'dark') => {
  //   saveSettings({ ...settings, theme: value } as themeSettingsTypes)
  // }

  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {downMd && (
          <Box sx={{ cursor: 'pointer' }} onClick={setShowMobileSideBar}>
            <ToggleIcon />
            <ToggleIcon width={18} />
            <ToggleIcon width={9} />
          </Box>
        )}

        <ClickAwayListener
          onClickAway={() => {
            // setSearchBar(false)
          }}
        >
          <Box>
            {/* {!openSearchBar && (
              <StyledIconButton onClick={() => setSearchBar(true)}>
                <SearchIcon sx={{ color: 'text.disabled' }} />
              </StyledIconButton>
            )} */}
            {/* <SearchBar
              open={openSearchBar}
              handleClose={() => setSearchBar(false)}
            /> */}
          </Box>
        </ClickAwayListener>

        <Box flexGrow={1} ml={1} />

        {/* {settings.theme === 'light' ? (
          <StyledIconButton onClick={() => handleChangeTheme('dark')}>
            <ThemeIcon />
          </StyledIconButton>
        ) : (
          <StyledIconButton onClick={() => handleChangeTheme('light')}>
            <ThemeIcon />
          </StyledIconButton>
        )} */}

        {upSm && (
          <Fragment>
            {/* <LanguagePopover /> */}
            {/* <NotificationsPopover /> */}
            {/* <ServicePopover /> */}
          </Fragment>
        )}
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  )
}

export default DashboardHeader
