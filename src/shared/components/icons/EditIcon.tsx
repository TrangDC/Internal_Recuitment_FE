import { SvgIcon, SvgIconProps } from '@mui/material'

const EditIcon = ({ sx = { fontSize: '16px' }, ...props }: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={sx}
      {...props}
    >
      <path d="M2.66663 11.2359V13.0372C2.66663 13.2031 2.79698 13.3334 2.96288 13.3334H4.76411C4.84114 13.3334 4.91816 13.3038 4.97149 13.2445L11.4417 6.78025L9.21979 4.55834L2.7555 11.0226C2.69625 11.0819 2.66663 11.153 2.66663 11.2359ZM13.16 5.06197C13.3911 4.83089 13.3911 4.45761 13.16 4.22653L11.7735 2.84006C11.5424 2.60898 11.1691 2.60898 10.9381 2.84006L9.85378 3.92435L12.0757 6.14626L13.16 5.06197Z" />
    </SvgIcon>
  )
}

export default EditIcon
