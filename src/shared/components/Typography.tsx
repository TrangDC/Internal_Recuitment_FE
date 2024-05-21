import { FC } from 'react'
import { Box, BoxProps, styled } from '@mui/material'
import clsx from 'clsx'

const StyledBox = styled(Box)<{ ellipsis?: number }>(({ ellipsis }) => ({
  ...(ellipsis && {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
}))

type Props = { ellipsis?: boolean }

export const H1: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={28}
      component="h1"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const H2: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={24}
      component="h2"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const H3: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={18}
      component="h3"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const H4: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={16}
      component="h4"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const H5: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={18}
      component="h5"
      lineHeight={'21.94px'}
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const H6: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={13}
      component="h6"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Paragraph: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={14}
      component="p"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Small: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={13}
      component="small"
      fontWeight={500}
      lineHeight={1.6}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Span: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      fontSize={14}
      component="span"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Tiny: React.FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props

  return (
    <StyledBox
      component="p"
      fontSize={13}
      fontWeight={500}
      lineHeight={1.65}
      color="text.secondary"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Tiny12: React.FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props
  return (
    <StyledBox
      component="p"
      fontSize={12}
      fontWeight={600}
      lineHeight={'14.63px'}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}

export const Tiny12md: React.FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props
  return (
    <StyledBox
      component="p"
      fontSize={12}
      fontWeight={500}
      lineHeight={'14.63px'}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || '']: true })}
      {...others}
    >
      {children}
    </StyledBox>
  )
}
