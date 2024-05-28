import { SvgIconProps } from '@mui/material'

const WarningIcon = (props: SvgIconProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="4" fill="#FFF3B8" />
      <path
        d="M20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30ZM20 15C19.45 15 19 15.45 19 16V20C19 20.55 19.45 21 20 21C20.55 21 21 20.55 21 20V16C21 15.45 20.55 15 20 15ZM21 23H19V25H21V23Z"
        fill="#FFAF46"
      />
    </svg>
  )
}

export default WarningIcon
