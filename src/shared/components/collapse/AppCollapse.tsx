import { Collapse, SxProps, Theme } from '@mui/material'
import { Text15md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ReactNode } from 'react'
import ChevronUp from 'shared/components/icons/ChevronUpIcon'
import ChevronDown from 'shared/components/icons/ChevronDownIcon'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
type AppCollapseProps = {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  padding?: number | string
  titleStyle?: SxProps<Theme>
  directionTitle?: 'row' | 'row-reverse'
  gapTitle?: number | string
  CustomTitle?: ReactNode
  onClose?: () => void
  onOpen?: () => void
  Icon?: ReactNode
  showIcon?: boolean
  iconSx?: SxProps
}

function AppCollapse({
  children,
  open,
  setOpen,
  title,
  padding = 2,
  titleStyle,
  directionTitle = 'row',
  gapTitle,
  CustomTitle,
  onClose,
  onOpen,
  Icon,
  showIcon,
  iconSx,
}: AppCollapseProps) {
  return (
    <FlexBox flexDirection={'column'} padding={padding}>
      <FlexBox
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (open) {
            onClose?.()
          } else {
            onOpen?.()
          }
          setOpen(!open)
        }}
        marginBottom={2}
        justifyContent={'space-between'}
      >
        <FlexBox
          maxWidth={'fit-content'}
          justifyContent={'revert'}
          alignItems={'center'}
          flexDirection={directionTitle}
          gap={gapTitle}
        >
          {showIcon && (
            <>
              {Icon ? (
                Icon
              ) : (
                <WarningRoundedIcon
                  sx={{ fontSize: '16px', color: 'primary.error', ...iconSx }}
                />
              )}
            </>
          )}
          <Text15md color={'primary.800'} sx={titleStyle}>
            {title}
          </Text15md>
          {open ? <ChevronUp /> : <ChevronDown />}
        </FlexBox>
        {CustomTitle}
      </FlexBox>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </FlexBox>
  )
}

export default AppCollapse
