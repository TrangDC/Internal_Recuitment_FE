import { SvgIcon, SvgIconProps } from "@mui/material";

const Add = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M8.125 3.625H11.25C11.5938 3.625 11.875 3.90625 11.875 4.25V11.75C11.875 12.0938 11.5938 12.375 11.25 12.375H8.125C7.78125 12.375 7.5 12.6562 7.5 13C7.5 13.3438 7.78125 13.625 8.125 13.625H11.875C12.5625 13.625 13.125 13.0625 13.125 12.375V3.625C13.125 2.9375 12.5625 2.375 11.875 2.375H8.125C7.78125 2.375 7.5 2.65625 7.5 3C7.5 3.34375 7.78125 3.625 8.125 3.625ZM7.91875 7.375L6.74375 6.2C6.5 5.95625 6.5 5.5625 6.74375 5.31875C6.9875 5.075 7.38125 5.075 7.625 5.31875L9.86875 7.5625C10.1125 7.80625 10.1125 8.2 9.86875 8.44375L7.625 10.6875C7.38125 10.9313 6.9875 10.9313 6.74375 10.6875C6.5 10.4438 6.5 10.05 6.74375 9.80625L7.91875 8.625H2.5C2.15625 8.625 1.875 8.34375 1.875 8C1.875 7.65625 2.15625 7.375 2.5 7.375H7.91875Z" fill="#1F84EB"/>
    </SvgIcon>
  );
};

export default Add;
