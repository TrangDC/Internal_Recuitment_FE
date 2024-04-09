import { IconButton } from "@mui/material";
import React, { FC } from "react";
import FlexRowAlign from "../flexbox/FlexRowAlign";
import { Small } from "../Typography";
import ImageUploadIcon from "shared/components/icons/ImageUploadIcon";

// ------------------------------------------------------------------
type ImageUploadInputProps = {
  handleOnChange?: () => void;
};
// ------------------------------------------------------------------

const ImageUploadInput: FC<ImageUploadInputProps> = ({ handleOnChange }) => {
  return (
    <label htmlFor="icon-button-file">
      <input
        type="file"
        accept="image/*"
        id="icon-button-file"
        style={{ display: "none" }}
        onChange={handleOnChange}
      />

      <IconButton
        disableRipple
        component="span"
        sx={{ padding: 0, display: "block" }}
      >
        <FlexRowAlign
          gap={0.5}
          sx={{
            minHeight: 40,
            borderRadius: "8px",
            backgroundColor: "divider",
          }}
        >
          <ImageUploadIcon sx={{ fontSize: 18, color: "text.disabled" }} />
          <Small color="text.disabled">Choose a file</Small>
        </FlexRowAlign>
      </IconButton>
    </label>
  );
};

export default ImageUploadInput;
