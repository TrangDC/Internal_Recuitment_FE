import { SvgIconProps } from '@mui/material'

const FileIcon = (props: SvgIconProps) => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 0.5C0.9 0.5 0.0100002 1.4 0.0100002 2.5L0 18.5C0 19.6 0.89 20.5 1.99 20.5H14C15.1 20.5 16 19.6 16 18.5V7.33C16 6.8 15.79 6.29 15.41 5.92L10.58 1.09C10.21 0.71 9.7 0.5 9.17 0.5H2ZM9 6.5V2L14.5 7.5H10C9.45 7.5 9 7.05 9 6.5Z"
        fill="#BABFC5"
      />
    </svg>
  )
}

export default FileIcon
