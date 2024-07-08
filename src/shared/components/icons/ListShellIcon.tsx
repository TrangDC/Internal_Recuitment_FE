import { SvgIcon, SvgIconProps } from '@mui/material'

const ListShellIcon = ({sx, ...props}: SvgIconProps) => {
  return (
    <SvgIcon sx={{fill: 'none', fontSize: '32px', ...sx}} viewBox="0 0 32 32" {...props}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#BABFC5" />
      <g clipPath="url(#clip0_16017_24885)">
        <path
          d="M24.25 7H18.25C17.8358 7 17.5 7.33579 17.5 7.75V18.25C17.5 18.6642 17.8358 19 18.25 19H24.25C24.6642 19 25 18.6642 25 18.25V7.75C25 7.33579 24.6642 7 24.25 7Z"
          fill="#BABFC5"
        />
        <path
          d="M24.25 20.5H18.25C17.8358 20.5 17.5 20.8358 17.5 21.25V24.25C17.5 24.6642 17.8358 25 18.25 25H24.25C24.6642 25 25 24.6642 25 24.25V21.25C25 20.8358 24.6642 20.5 24.25 20.5Z"
          fill="#BABFC5"
        />
        <path
          d="M15.25 7H7.75C7.33579 7 7 7.33579 7 7.75V13C7 13.4142 7.33579 13.75 7.75 13.75H15.25C15.6642 13.75 16 13.4142 16 13V7.75C16 7.33579 15.6642 7 15.25 7Z"
          fill="#BABFC5"
        />
        <path
          d="M15.25 15.25H7.75C7.33579 15.25 7 15.5858 7 16V24.25C7 24.6642 7.33579 25 7.75 25H15.25C15.6642 25 16 24.6642 16 24.25V16C16 15.5858 15.6642 15.25 15.25 15.25Z"
          fill="#BABFC5"
        />
      </g>
      <defs>
        <clipPath id="clip0_16017_24885">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

export default ListShellIcon
