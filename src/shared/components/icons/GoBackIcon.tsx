import { SvgIcon, SvgIconProps } from '@mui/material'

const GoBackIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
    width="11" height="5" viewBox="0 0 11 5" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
     <path d="M5.25 0.5C3.925 0.5 2.725 0.995 1.8 1.8L0.855 0.855C0.54 0.54 0 0.76 0 1.205V4C0 4.275 0.225 4.5 0.5 4.5H3.295C3.74 4.5 3.965 3.96 3.65 3.645L2.695 2.69C3.39 2.11 4.275 1.75 5.255 1.75C6.835 1.75 8.2 2.67 8.85 4C8.985 4.28 9.305 4.42 9.6 4.32C9.955 4.205 10.135 3.8 9.975 3.46C9.115 1.71 7.325 0.5 5.25 0.5Z" fill="#2499EF"/>
    </SvgIcon>
  )
}

export default GoBackIcon
