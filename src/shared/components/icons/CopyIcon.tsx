import { SvgIcon, SvgIconProps } from '@mui/material'

const CopyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 13 15" {...props}>
      <path
        d="M8.99998 0.166748H1.66665C0.933313 0.166748 0.333313 0.766748 0.333313 1.50008V10.1667C0.333313 10.5334 0.633313 10.8334 0.99998 10.8334C1.36665 10.8334 1.66665 10.5334 1.66665 10.1667V2.16675C1.66665 1.80008 1.96665 1.50008 2.33331 1.50008H8.99998C9.36665 1.50008 9.66665 1.20008 9.66665 0.833415C9.66665 0.466748 9.36665 0.166748 8.99998 0.166748ZM9.39331 3.22675L12.6133 6.44675C12.86 6.69341 13 7.03341 13 7.38675V13.5001C13 14.2334 12.4 14.8334 11.6666 14.8334H4.32665C3.59331 14.8334 2.99998 14.2334 2.99998 13.5001L3.00665 4.16675C3.00665 3.43341 3.59998 2.83341 4.33331 2.83341H8.44665C8.79998 2.83341 9.13998 2.97341 9.39331 3.22675ZM8.99998 7.50008H12L8.33331 3.83341V6.83341C8.33331 7.20008 8.63331 7.50008 8.99998 7.50008Z"
        fill="#4D607A"
      />
    </SvgIcon>
  )
}

CopyIcon.defaultProps = {
  sx: {
    fontSize: '16px',
  },
}

export default CopyIcon
