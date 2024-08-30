import { SvgIcon, SvgIconProps } from '@mui/material'

const RemoveBox = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 15 16"
      sx={{ fontSize: '15px', ...props.sx }}
      {...props}
    >
      <path d="M7.5 1.75C4.04375 1.75 1.25 4.54375 1.25 8C1.25 11.4563 4.04375 14.25 7.5 14.25C10.9563 14.25 13.75 11.4563 13.75 8C13.75 4.54375 10.9563 1.75 7.5 1.75ZM10.625 10.2437L9.74375 11.125L7.5 8.88125L5.25625 11.125L4.375 10.2437L6.61875 8L4.375 5.75625L5.25625 4.875L7.5 7.11875L9.74375 4.875L10.625 5.75625L8.38125 8L10.625 10.2437Z" />
    </SvgIcon>
  )
}

export default RemoveBox
