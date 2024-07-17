import { Avatar, Badge, Button, Skeleton, Tooltip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useRef } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'

interface IAvatarEmployee {
  idAvatar?: string
  width?: number
  height?: number
  action: 'create' | 'detail' | 'edit'
}

function AvatarUser(props: IAvatarEmployee) {
  const { width, action } = props
  const avatarRef = useRef(null)
  const isLoading = false
  return (
    <FlexBox
      width={width || 'unset'}
      alignItems={'center'}
      justifyContent={'center'}
      position="relative"
    >
      {isLoading ? (
        <Skeleton
          sx={{
            width: 100,
            height: 168,
            borderRadius: '50%',
          }}
        />
      ) : (
        <FlexBox
          flexDirection={'column'}
          gap={1}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Tooltip title={''} arrow open={false} placement="top">
                {action !== 'detail' ? (
                  <Button
                    size="small"
                    component="label"
                    variant="text"
                    disabled
                    sx={{
                      maxWidth: 28,
                      minWidth: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'primary.50',
                      border: '2px solid white',
                      ':hover': {
                        backgroundColor: 'primary.50',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#F1F9FF',
                      },
                    }}
                  >
                    <CameraAltIcon
                      sx={{ fontSize: '15px', color: 'grey.300' }}
                    />
                    <input
                      ref={avatarRef}
                      name={'avatar'}
                      hidden
                      type="file"
                      accept=".jpg, .jpeg, .png"
                    />
                  </Button>
                ) : (
                  <></>
                )}
              </Tooltip>
            }
          >
            <Avatar
              alt="avatar"
              src={'/static/illustration/avatar.svg'}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'contain',
              }}
            />
          </Badge>
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default AvatarUser
