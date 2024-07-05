import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'

const LoadingSpinner: React.FC = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(6px)',
      }}
      open={true}
    >
      <FlexBox flexDirection={'column'} alignItems={'center'} gap={2}></FlexBox>
    </Backdrop>
  )
}

export default LoadingSpinner
