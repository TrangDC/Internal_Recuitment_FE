import { SvgIconProps } from '@mui/material'

const ViewIcon = (props: SvgIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 4C5.27273 4 2.94364 5.62568 2 7.92045C2.94364 10.2152 5.27273 11.8409 8 11.8409C10.7273 11.8409 13.0564 10.2152 14 7.92045C13.0564 5.62568 10.7273 4 8 4ZM8 10.5341C6.49455 10.5341 5.27273 9.36318 5.27273 7.92045C5.27273 6.47773 6.49455 5.30682 8 5.30682C9.50545 5.30682 10.7273 6.47773 10.7273 7.92045C10.7273 9.36318 9.50545 10.5341 8 10.5341ZM8 6.35227C7.09455 6.35227 6.36364 7.05273 6.36364 7.92045C6.36364 8.78818 7.09455 9.48864 8 9.48864C8.90545 9.48864 9.63636 8.78818 9.63636 7.92045C9.63636 7.05273 8.90545 6.35227 8 6.35227Z"
        fill="#4D607A"
      />
    </svg>
  )
}

ViewIcon.defaultProps = {
  sx: {
    fontSize: '16px',
  },
}

export default ViewIcon
