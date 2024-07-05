import { alpha, Box, ButtonBase, styled } from '@mui/material'
import { Paragraph, Span } from 'shared/components/Typography'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ILabelSideBar,
  IMenuSideBar,
  INavigation,
  navigation,
} from '../layout-parts/navigation'
import SidebarAccordion from './SidebarAccordion'
import { usePermissionSidebar } from 'features/authorization/hooks/usePermissionSidebar'

type Active = { active: any }
type Compact = { compact: number }
type ActiveCompact = Active & Compact

const NavItemButton = styled(ButtonBase)<Active>(({ theme, active }) => ({
  height: 44,
  width: '100%',
  borderRadius: 8,
  marginBottom: 4,
  padding: '0 18px',
  justifyContent: 'flex-start',
  transition: 'all 0.15s ease',
  ...(active && {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
  }),
  '&:hover': { backgroundColor: theme.palette.action.hover },
}))

const ListLabel = styled(Paragraph)<Compact>(({ theme, compact }) => ({
  fontWeight: 700,
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  transition: 'all 0.15s ease',
  color: theme.palette.text.secondary,
  ...(compact && { opacity: 0, width: 0 }),
}))

const ExternalLink = styled('a')(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  color: theme.palette.text.primary,
}))

const StyledText = styled(Span)<ActiveCompact>(
  ({ theme, compact, active }) => ({
    whiteSpace: 'nowrap',
    paddingLeft: '0.8rem',
    transition: 'all 0.15s ease',
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    lineHeight: '15.85px',
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    ...(compact && { opacity: 0, width: 0 }),
  })
)

const BulletIcon = styled('div')<Active>(({ theme, active }) => ({
  width: 4,
  height: 4,
  marginLeft: '10px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '50%',
  background: active ? theme.palette.primary.main : theme.palette.text.disabled,
  boxShadow: active ? `0px 0px 0px 3px ${theme.palette.primary[200]}` : 'none',
}))

// Common icon style
const iconStyle = (active: any) => ({
  fontSize: 20,
  marginRight: '4px',
  color: active ? 'primary.main' : 'text.secondary',
})

// ---------------------------------------------------------------
type MultiLevelMenuProps = { sidebarCompact: boolean }
// ---------------------------------------------------------------

const MultiLevelMenu: FC<MultiLevelMenuProps> = ({ sidebarCompact }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const menuItems = usePermissionSidebar({
    navigation: navigation,
  })
  // handle active current page
  const activeRoute = (path: string) => (pathname === path ? 1 : 0)
  // handle navigate to another route or page
  const handleNavigation = (path: string) => navigate(path)

  // ACTIVATE SIDEBAR COMPACT
  const COMPACT = sidebarCompact ? 1 : 0

  //   RECURSIVE FUNCTION TO RENDER MULTI LEVEL MENU
  const renderLevels = (data: IMenuSideBar[] | ILabelSideBar[]) => {
    return data.map((item: INavigation, index: number) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} compact={COMPACT}>
            {item.label}
          </ListLabel>
        )

      if ((item as IMenuSideBar).children) {
        const menuSideBar = item as IMenuSideBar
        if (menuSideBar.children && menuSideBar.children.length > 0) {
          return (
            <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
              {renderLevels(menuSideBar.children)}
            </SidebarAccordion>
          )
        }
      } else if ((item as IMenuSideBar).type === 'extLink') {
        const menuSideBar = item as IMenuSideBar
        return (
          <ExternalLink
            key={index}
            href={menuSideBar.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavItemButton key={menuSideBar.name} name="child" active={0}>
              {menuSideBar.icon ? (
                <menuSideBar.icon sx={iconStyle(0)} />
              ) : (
                <span className="item-icon icon-text">
                  {menuSideBar.iconText}
                </span>
              )}
              <StyledText
                compact={COMPACT}
                active={activeRoute(menuSideBar.path)}
              >
                {menuSideBar.name}
              </StyledText>

              <Box mx="auto" />
            </NavItemButton>
          </ExternalLink>
        )
      } else {
        const menuSideBar = item as IMenuSideBar
        return (
          <Box key={index}>
            <NavItemButton
              key={menuSideBar.name}
              className="navItem"
              active={activeRoute(menuSideBar.path)}
              onClick={() => handleNavigation(menuSideBar.path)}
            >
              {menuSideBar?.icon ? (
                <menuSideBar.icon
                  sx={iconStyle(activeRoute(menuSideBar.path))}
                />
              ) : (
                <BulletIcon active={activeRoute(menuSideBar.path)} />
              )}

              <StyledText
                compact={COMPACT}
                active={activeRoute(menuSideBar.path)}
              >
                {menuSideBar.name}
              </StyledText>

              <Box mx="auto" />
            </NavItemButton>
          </Box>
        )
      }
    })
  }

  return <>{renderLevels(menuItems as IMenuSideBar[] | ILabelSideBar[])}</>
}

export default MultiLevelMenu
