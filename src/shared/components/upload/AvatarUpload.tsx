import { Avatar, Badge, Button, Skeleton, Tooltip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'

interface IAvatarEmployee {
  idAvatar?: string
  width?: number
  height?: number
  readonly?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  titleTooltip?: string
  url: string
}

function AvatarUpload(props: IAvatarEmployee) {
  const { width, readonly, onChange, titleTooltip, url } = props
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
              <Tooltip title={titleTooltip} arrow open={true} placement="top">
                {!readonly ? (
                  <Button
                    size="small"
                    component="label"
                    variant="text"
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
                      onChange={onChange}
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
              src={url || '/static/illustration/avatar.svg'}
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

export default AvatarUpload
