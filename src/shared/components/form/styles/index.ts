import { Autocomplete, Button, TextField, styled} from "@mui/material";
import { greyLight } from "shared/theme/colors";

export const CustomTextField = styled(TextField)`
  max-width: 100%;
  margin-top: 10px;

  .MuiInputBase-root {
    height: 100%;
    background-color: white;
  }

  .MuiFormLabel-root span{
    font-size: 13px;
    font-weight: 500;
    color: #DB6C56;
    line-height: 15.85px;
  }
`

export const CustomAutoComplete = styled(Autocomplete)`
  max-width: 100%;

  .MuiInputBase-root .MuiAutocomplete-input {
    padding: 0px 4px 7.5px 6px;
  }
`

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
  background-color: ${greyLight[700]};

  
  &:hover {
    background-color: ${greyLight[500]};
  }
`