import { CSSProperties } from '@mui/styled-engine'
import LayoutBodyWrapper from 'layouts/layout-parts/LayoutBodyWrapper'
import { FC, Fragment, useState, ReactNode } from 'react'
import { Outlet } from 'react-router'
import DashboardHeader from '../layout-parts/DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import IsLogin from 'shared/hoc/IsLogin'
// --------------------------------------------
type DashboardLayoutProps = {
  children?: ReactNode
}
// --------------------------------------------

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCompact, setSidebarCompact] = useState(false)
  const [showMobileSideBar, setShowMobileSideBar] = useState(false)

  const handleCompactToggle = () => setSidebarCompact(!sidebarCompact)
  const handleMobileDrawerToggle = () => setShowMobileSideBar((state) => !state)

  // dashboard body wrapper custom style
  const customStyle: CSSProperties = {
    width: `calc(100% - ${sidebarCompact ? '86px' : '260px'})`,
    marginLeft: sidebarCompact ? '86px' : '260px',
  }

  return (
    <Fragment>
      <DashboardSidebar
        sidebarCompact={sidebarCompact}
        showMobileSideBar={showMobileSideBar}
        setSidebarCompact={handleCompactToggle}
        setShowMobileSideBar={handleMobileDrawerToggle}
      />

      <LayoutBodyWrapper sx={customStyle}>
        <DashboardHeader
          setShowSideBar={handleCompactToggle}
          setShowMobileSideBar={handleMobileDrawerToggle}
        />

        {children || <Outlet />}
      </LayoutBodyWrapper>
    </Fragment>
  )
}

export default IsLogin(DashboardLayout)
