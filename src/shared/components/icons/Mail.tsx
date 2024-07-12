import { SvgIcon, SvgIconProps } from '@mui/material'

const Mail = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 12 13" {...props}>
      <path
        d="M10 2.5H2C1.45 2.5 1.005 2.95 1.005 3.5L1 9.5C1 10.05 1.45 10.5 2 10.5H10C10.55 10.5 11 10.05 11 9.5V3.5C11 2.95 10.55 2.5 10 2.5ZM9.8 4.625L6.265 6.835C6.105 6.935 5.895 6.935 5.735 6.835L2.2 4.625C2.075 4.545 2 4.41 2 4.265C2 3.93 2.365 3.73 2.65 3.905L6 6L9.35 3.905C9.635 3.73 10 3.93 10 4.265C10 4.41 9.925 4.545 9.8 4.625Z"
      />
    </SvgIcon>
  )
}

export default Mail
