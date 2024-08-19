import { alpha, styled } from '@mui/material'
import { SxProps } from '@mui/system'
import { ReactNode, CSSProperties, UIEventHandler } from 'react'
import SimpleBar, { Props } from 'simplebar-react'

const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': { backgroundColor: alpha(theme.palette.grey[400], 0.6) },
    '&.simplebar-visible:before': { opacity: 1 },
  },

  '& .simplebar-track.simplebar-vertical': { width: 9 },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 7,
    '&::before': {
      height: '100%',
    },
  },
  '& .simplebar-mask': { zIndex: 'inherit' },
}))

// props type
type ScrollbarProps = {
  sx?: SxProps
  children: ReactNode
  style?: CSSProperties
  onBottom?: () => void
}

const Scrollbar = ({
  children,
  style,
  sx,
  onBottom,
  ...props
}: ScrollbarProps & Props) => {
  function scrollHandler(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const { scrollHeight, scrollTop, clientHeight } =
      event.target as HTMLDivElement
    const isBottomReached =
      Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1
    if (isBottomReached) {
      onBottom?.()
    }
  }
  return (
    <StyledScrollBar
      style={style}
      sx={sx}
      {...props}
      onScrollCapture={scrollHandler}
    >
      {children}
    </StyledScrollBar>
  )
}

export default Scrollbar
