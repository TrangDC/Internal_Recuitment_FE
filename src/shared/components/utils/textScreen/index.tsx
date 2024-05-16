import { Theme } from '@emotion/react'
import { SxProps, styled } from '@mui/material'
import { H5 } from 'shared/components/Typography'

const StyleHeading = styled(H5)(({ theme }) => ({
  color: theme.palette.grey[900],
}))

interface TextHeadingProps {
    children: string | React.ReactNode,
    sx?: SxProps<Theme> | undefined
}

export const TextHeading = ({children, ...props}: TextHeadingProps) => {
  return <StyleHeading {...props}>{children}</StyleHeading>
}
