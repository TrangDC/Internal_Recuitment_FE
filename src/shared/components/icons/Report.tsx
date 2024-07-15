import { SvgIcon, SvgIconProps } from '@mui/material'

const ReportIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 13H21V21H17V13ZM3 9.5H7V21H3V9.5ZM10 3H14V21H10V3Z"
        fill="#1F84EB"
      />
    </SvgIcon>
  )
}

export default ReportIcon
