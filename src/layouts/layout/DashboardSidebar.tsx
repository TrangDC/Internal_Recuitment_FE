import { Box, IconButton, styled, Theme, useMediaQuery } from '@mui/material'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { FC, useState } from 'react'
import ArrowLeftToLine from 'shared/components/icons/ArrowLeftToLine'
import MultiLevelMenu from './MultiLevelMenu'
import MobileSidebar from './MobileSidebar'

const TOP_HEADER_AREA = 70

const SidebarWrapper = styled(Box)<{ compact: number }>(
  ({ theme, compact }) => ({
    height: '100vh',
    position: 'fixed',
    width: compact ? 86 : 260,
    transition: 'all .2s ease',
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.background.paper,
    '&:hover': compact && { width: 280 },
    boxShadow: 'rgba(77, 96, 122, 0.03) 0px 3px 3px -2px, rgba(77, 96, 122, 0.04) 0px 2px 6px 0px, rgba(77, 96, 122, 0.08) 0px 1px 12px 0px'
  })
)

const NavWrapper = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%',
}))

const StyledLogo = styled(Box)(() => ({
  paddingLeft: 8,
  fontWeight: 700,
  fontSize: 20,
}))

const StyledArrow = styled(ArrowLeftToLine)(() => ({
  display: 'block',
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
}))

// -----------------------------------------------------------------------------
type DashboardSidebarProps = {
  sidebarCompact: boolean
  showMobileSideBar: boolean
  setSidebarCompact: () => void
  setShowMobileSideBar: () => void
}
// -----------------------------------------------------------------------------

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const {
    sidebarCompact,
    showMobileSideBar,
    setShowMobileSideBar,
    setSidebarCompact,
  } = props

  const [onHover, setOnHover] = useState(false)
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Activate compact when toggle button clicked and not on hover state
  const COMPACT = sidebarCompact && !onHover ? 1 : 0

  //   IF MOBILE
  if (downLg) {
    return (
      <MobileSidebar
        sidebarCompact={!!COMPACT}
        showMobileSideBar={!!showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
      />
    )
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween pt={3} pr={2} pl={4} pb={1} height={TOP_HEADER_AREA}>
        {/* LOGO */}
        <FlexBox alignItems={'center'}>
          <img src="/static/logo/logo.svg" alt="logo" width={40} />
          {!COMPACT && <StyledLogo>TREC</StyledLogo>}
        </FlexBox>
        <Box mx={'auto'}></Box>

        {/* SIDEBAR COLLAPSE BUTTON */}
        <StyledIconButton
          onClick={setSidebarCompact}
          sx={{ display: COMPACT ? 'none' : 'block' }}
        >
          <StyledArrow />
        </StyledIconButton>
      </FlexBetween>

      {/* NAVIGATION ITEMS */}
      <Scrollbar
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: 'hidden',
          maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
        }}
      >
        <NavWrapper>
          <MultiLevelMenu sidebarCompact={!!COMPACT} />
        </NavWrapper>
      </Scrollbar>
    </SidebarWrapper>
  )
}

export default DashboardSidebar
