import { SvgIcon, SvgIconProps } from '@mui/material'

const ExPoint = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" sx={{fontSize: '16px', ...props.sx}} {...props}>
      <path
        d="M7.99967 1.83301C4.31967 1.83301 1.33301 4.81967 1.33301 8.49967C1.33301 12.1797 4.31967 15.1663 7.99967 15.1663C11.6797 15.1663 14.6663 12.1797 14.6663 8.49967C14.6663 4.81967 11.6797 1.83301 7.99967 1.83301ZM7.99967 11.833C7.63301 11.833 7.33301 11.533 7.33301 11.1663V8.49967C7.33301 8.13301 7.63301 7.83301 7.99967 7.83301C8.36634 7.83301 8.66634 8.13301 8.66634 8.49967V11.1663C8.66634 11.533 8.36634 11.833 7.99967 11.833ZM8.66634 6.49967H7.33301V5.16634H8.66634V6.49967Z"
        fill="#82868C"
      />
    </SvgIcon>
  )
}

export default ExPoint