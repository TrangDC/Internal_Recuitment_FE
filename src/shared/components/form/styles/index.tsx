import { Autocomplete, Box, BoxProps, Button, TextField, styled} from "@mui/material";
import { FC } from "react";
import { primary } from "shared/theme/colors";
import clsx from "clsx";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  maxWidth: '100%',
  marginTop: '10px',

  '& .MuiInputBase-root' : {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingRight: 0,
  },

  '& .MuiInputBase-root .Mui-disabled' : {
    backgroundColor: "#F0F1F8",
    color: "#82868c"
  },

  '& .MuiFormLabel-root span': {
    fontSize: 13,
    fontWeight: 500,
    color: '#DB6C56',
    lineHeight: '15.85px',
    display: 'inline-block',
    marginLeft: 2,
  }
 }))

export const CustomAutoComplete = styled(Autocomplete)(({ theme }) => ({
  maxWidth: '100%',

  '&.MuiInputBase-root' : {
    backgroundColor: theme.palette.background.paper
  },

  '&.MuiInputBase-root .MuiAutocomplete-input': {
    padding: '0px 4px 7.5px 6px'
  }
 }))


export const DivWrapper = styled('div')`
  width: 100%;
  margin: 0;
`

export const DivError = styled('div')`
  width: 100%;
  margin-top: 5px;

  span {
    color: red;
    font-size: 14px;
  }
`

export const DivListOption = styled('div')`
  width: 100%;
  margin-top: 10px;
`


export const CustomStyleManage = styled('div')`
  .MuiChip-root {
    background-color: #efb3ed;
    border: none;
  }

  .MuiChip-label {
    color: black;
  }
`
export const CustomeButtonCancel = styled(Button)`
  background-color: #F1F9FF;
  border: 1px solid #88CDFF;
  color: #1F84EB;
  
  &:hover {
    background-color: ${primary[50]};
  }
`

const StyledBox = styled(Box)<{ ellipsis?: number }>(({ ellipsis }) => ({
  ...(ellipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
}));


type Props = { ellipsis?: boolean };

export const SpanText: FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={12}
      fontWeight={500}
      lineHeight={'14.63px'}
      component="span"
      color="text.secondary"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || ""]: true })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const TinyText: React.FC<BoxProps & Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      component="p"
      fontSize={13}
      fontWeight={600}
      lineHeight={'15.85px'}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({ [className || ""]: true })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};


