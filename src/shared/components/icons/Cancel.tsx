import { SvgIcon, SvgIconProps } from '@mui/material'

const Cancel = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        d="M8.00016 1.3335C4.3135 1.3335 1.3335 4.3135 1.3335 8.00016C1.3335 11.6868 4.3135 14.6668 8.00016 14.6668C11.6868 14.6668 14.6668 11.6868 14.6668 8.00016C14.6668 4.3135 11.6868 1.3335 8.00016 1.3335ZM11.3335 10.3935L10.3935 11.3335L8.00016 8.94016L5.60683 11.3335L4.66683 10.3935L7.06016 8.00016L4.66683 5.60683L5.60683 4.66683L8.00016 7.06016L10.3935 4.66683L11.3335 5.60683L8.94016 8.00016L11.3335 10.3935Z"
        fill="#4D607A"
      />
    </SvgIcon>
  )
}

Cancel.defaultProps = {
  sx: {
    fontSize: '16px',
  },
}

export default Cancel
