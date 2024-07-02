import { SvgIcon, SvgIconProps } from "@mui/material";

const DotIcon = ({sx = {fontSize: '3px'}, ...props}: SvgIconProps) => {
  return (
    <SvgIcon width="3" height="3" viewBox="0 0 3 3" sx={sx} {...props}>
      <path d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z" fill="#7B8EAC"/>
    </SvgIcon>
  );
};

export default DotIcon;
