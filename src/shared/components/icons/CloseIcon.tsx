import { SvgIcon, SvgIconProps } from '@mui/material'

const CloseIcon = ({ sx, ...props }: SvgIconProps) => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ fontSize: '16px', ...sx }}
      {...props}
    >
      <path
        d="M8.00004 1.33331C4.31337 1.33331 1.33337 4.31331 1.33337 7.99998C1.33337 11.6866 4.31337 14.6666 8.00004 14.6666C11.6867 14.6666 14.6667 11.6866 14.6667 7.99998C14.6667 4.31331 11.6867 1.33331 8.00004 1.33331ZM11.3334 10.3933L10.3934 11.3333L8.00004 8.93998L5.60671 11.3333L4.66671 10.3933L7.06004 7.99998L4.66671 5.60665L5.60671 4.66665L8.00004 7.05998L10.3934 4.66665L11.3334 5.60665L8.94004 7.99998L11.3334 10.3933Z"
        fill="#4D607A"
      />
    </SvgIcon>
  )
}

export default CloseIcon
