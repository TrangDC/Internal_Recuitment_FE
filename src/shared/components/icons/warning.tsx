import { SvgIcon, SvgIconProps } from '@mui/material'

const CustomWarningIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22ZM12 7C11.45 7 11 7.45 11 8V12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12V8C13 7.45 12.55 7 12 7ZM13 15H11V17H13V15Z"
        fill="#FFAF46"
      />
    </SvgIcon>
  )
}

export default CustomWarningIcon
