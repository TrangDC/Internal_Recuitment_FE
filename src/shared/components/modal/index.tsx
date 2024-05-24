import { Box, Modal, SxProps, Theme, styled } from '@mui/material'
import { FC, ReactNode, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import FlexBox from '../flexbox/FlexBox'
import IconWrapper from '../IconWrapper'
import Scrollbar from '../ScrollBar'
import { ITitle, IWrapper } from './interface'
import { greyLight, primary } from 'shared/theme/colors'
import { lightTheme } from 'shared/constants/constants'
import { H4, H6 } from '../Typography'

const Wrapper: FC<IWrapper> = ({
  maxWidth = 960,
  children,
  open,
  setOpen,
  handleClose,
  zIndex,
  ...other
}) => {
  return (
    <Modal
      {...other}
      open={open}
      sx={{ zIndex: zIndex }}
      onClose={() => {
        handleClose ? handleClose() : setOpen(false)
      }}
    >
      <Content maxWidth={maxWidth}>{children}</Content>
    </Modal>
  )
}

const Header = ({
  title,
  setOpen,
  Icon,
  subTitle,
  children,
  iconColor,
  EndHeader,
}: ITitle) => {
  const { t } = useTranslation()
  return (
    <FlexBox
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'16px 32px'}
      borderBottom={'1px solid #E3E6EB'}
    >
      <FlexBox>
        {Icon && (
          <IconWrapper
            sx={{
              backgroundColor: iconColor ?? 'primary.pumpkin.100',
              maxWidth: 40,
              minWidth: 40,
            }}
          >
            {Icon}
          </IconWrapper>
        )}
        <FlexBox flexDirection={'column'} justifyContent={'center'} gap={1}>
          <H4
            color={primary[800]}
            fontSize={'18px'}
            fontWeight={'600'}
            lineHeight={'21.94px'}
          >
            {t(title)}
          </H4>
          {subTitle && <H6 fontSize={14}>{t(subTitle || '')}</H6>}
        </FlexBox>
      </FlexBox>
      <FlexBox gap={'10px'} alignItems={'center'}>
        {children}
        <Box>
          {EndHeader ? (
           EndHeader
          ) : (
            <CloseIcon
              sx={{
                height: '24px',
                width: '24px',
                color: greyLight[300],
                cursor: 'pointer',
              }}
              onClick={() => {
                setOpen(false)
              }}
            />
          )}
        </Box>
      </FlexBox>
    </FlexBox>
  )
}

const ContentStyled = styled(Box)(({ theme }) => ({
  top: '50%',
  left: '50%',
  minWidth: 300,
  outline: 'none',
  width: '100%',
  borderRadius: '8px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: lightTheme(theme)
    ? '#fff'
    : theme.palette.background.default,
}))

const Content = forwardRef(
  (
    {
      children,
      maxWidth = 960,
    }: {
      children: ReactNode
      maxWidth?: string | number
      height?: string | number
    },
    ref
  ) => {
    return (
      <ContentStyled
        maxWidth={maxWidth}
        display={'flex'}
        flexDirection={'column'}
      >
        {children}
      </ContentStyled>
    )
  }
)

const ContentMain = ({
  children,
  maxHeight = '400px',
  sxContentMain,
}: {
  children: ReactNode
  maxHeight?: string
  sxContentMain?: SxProps
}) => {
  return (
    <Box padding={'20px 32px'} sx={{ ...sxContentMain }}>
      <Scrollbar sx={{ maxHeight: maxHeight }}>{children}</Scrollbar>
    </Box>
  )
}
const ContentMainDetail = ({ children }: { children: ReactNode }) => {
  return <Box padding={'16px'}>{children}</Box>
}

const Footer = ({
  children,
  style,
}: {
  children: ReactNode
  style?: SxProps<Theme>
}) => {
  return (
    <FlexBox
      justifyContent="flex-end"
      gap={2}
      sx={style}
      padding={'16px 32px'}
      paddingTop={1}
    >
      {children}
    </FlexBox>
  )
}

const BaseModal = {
  Wrapper,
  Header,
  Footer,
  ContentMain,
  ContentMainDetail,
}
export default BaseModal
