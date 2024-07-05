import { SvgIconProps } from '@mui/material'

const CheckIcon = (props: SvgIconProps) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.333496 6.09217L4.89941 10.6668L13.6668 1.90805L12.4081 0.666748L4.89941 8.16675L1.57477 4.84213L0.333496 6.09217Z"
        fill="#82868C"
      />
    </svg>
  )
}

CheckIcon.defaultProps = {
  sx: {
    fontSize: '24px',
  },
}

export default CheckIcon
