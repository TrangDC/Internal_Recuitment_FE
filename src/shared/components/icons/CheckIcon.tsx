import { SvgIcon, SvgIconProps } from '@mui/material'

const CheckIcon = ({sx, ...props}: SvgIconProps) => {
  return (
    <SvgIcon
      width="14"
      height="11"
      viewBox="0 0 14 11"
      sx={{
        fontSize: '16px',
        ...sx
      }}
      {...props}
    >
      <path
        d="M0.333496 6.09217L4.89941 10.6668L13.6668 1.90805L12.4081 0.666748L4.89941 8.16675L1.57477 4.84213L0.333496 6.09217Z"
      />
    </SvgIcon>
  )
}

export default CheckIcon
