import { SvgIcon, SvgIconProps } from '@mui/material'

const Done = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        d="M8.00016 1.3335C4.32016 1.3335 1.3335 4.32016 1.3335 8.00016C1.3335 11.6802 4.32016 14.6668 8.00016 14.6668C11.6802 14.6668 14.6668 11.6802 14.6668 8.00016C14.6668 4.32016 11.6802 1.3335 8.00016 1.3335ZM6.66683 11.3335L3.3335 8.00016L4.2735 7.06016L6.66683 9.44683L11.7268 4.38683L12.6668 5.3335L6.66683 11.3335Z"
        fill="#4D607A"
      />
    </SvgIcon>
  )
}

Done.defaultProps = {
  sx: {
    fontSize: '16px',
  },
}

export default Done
