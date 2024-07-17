import { SvgIcon, SvgIconProps } from '@mui/material'

const ReportIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 11H19V19H15V11ZM1 7.5H5V19H1V7.5ZM8 1H12V19H8V1Z" />
    </SvgIcon>
  )
}

export default ReportIcon
