import { SvgIcon, SvgIconProps } from '@mui/material'

const DocIcon = ({ sx = {
    fontSize: '16px'
}, ...props }: SvgIconProps) => {
    return (
        <SvgIcon
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={sx}
            {...props}
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.64154 1.76259L13.1543 5.27531C13.4234 5.5444 13.5761 5.91531 13.5761 6.30077V12.9699C13.5761 13.7699 12.9215 14.4244 12.1215 14.4244H4.11426C3.31426 14.4244 2.66699 13.7699 2.66699 12.9699L2.67427 2.78804C2.67427 1.98804 3.32154 1.3335 4.12154 1.3335H8.60881C8.99426 1.3335 9.36517 1.48622 9.64154 1.76259ZM9.21245 6.4244H12.4852L8.48517 2.4244V5.69713C8.48517 6.09713 8.81245 6.4244 9.21245 6.4244ZM4.42457 8.4244H11.7579V9.75774H4.42457V8.4244ZM11.7579 11.0911H4.42457V12.4244H11.7579V11.0911Z" />
        </SvgIcon>
    )
}

export default DocIcon
