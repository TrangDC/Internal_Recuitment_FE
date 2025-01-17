import { SvgIcon, SvgIconProps } from '@mui/material'

const Verify = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 15 16"  sx={{fontSize: '15px', ...props.sx}} {...props}>
     <path d="M7.5 1.75C4.05 1.75 1.25 4.55 1.25 8C1.25 11.45 4.05 14.25 7.5 14.25C10.95 14.25 13.75 11.45 13.75 8C13.75 4.55 10.95 1.75 7.5 1.75ZM6.25 11.125L3.125 8L4.00625 7.11875L6.25 9.35625L10.9937 4.6125L11.875 5.5L6.25 11.125Z" />
    </SvgIcon>
  )
}

export default Verify
