import { Backdrop, CircularProgress } from '@mui/material'
import { Text15sb } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

type BackdropLoadingProps = {
  isLoading: boolean
}

function BackdropLoading({ isLoading }: BackdropLoadingProps) {
  return (
    isLoading && (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        open={isLoading}
      >
        <FlexBox flexDirection={'column'} alignItems={'center'} gap={2}>
          <CircularProgress color="inherit" />
          <Text15sb color={'grey.900'}>
            One moment. Loading your calendar...
          </Text15sb>
        </FlexBox>
      </Backdrop>
    )
  )
}
export default BackdropLoading
