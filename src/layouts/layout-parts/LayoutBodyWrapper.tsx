import { Box, styled, SxProps } from '@mui/material'
import { FC, Fragment, ReactNode } from 'react'

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  paddingLeft: '28px',
  paddingRight: '28px',
  transition: 'all 0.3s',
  [theme.breakpoints.down(1200)]: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
}))

const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: { maxWidth: '100%', margin: 'auto' },
}))

// --------------------------------------------
type LayoutBodyWrapperProps = {
  sx?: SxProps
  children: ReactNode
}
// --------------------------------------------

const LayoutBodyWrapper: FC<LayoutBodyWrapperProps> = ({ children, sx }) => {
  return (
    <Fragment>
      <Wrapper sx={sx}>
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
      {/* <LayoutSetting /> */}
    </Fragment>
  )
}

export default LayoutBodyWrapper
