import { SvgIconProps } from '@mui/material'

const SuccessIcon = (props: SvgIconProps) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="4" fill="#D4FCEC" />
      <path
        d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM18 25L13 20L14.41 18.59L18 22.17L25.59 14.58L27 16L18 25Z"
        fill="#20A4A9"
      />
    </svg>
  )
}

export default SuccessIcon
