import { Box, Grid, Theme, useMediaQuery } from "@mui/material";
import FlexRowAlign from "shared/components/flexbox/FlexRowAlign";
import { FC, ReactNode } from "react";

// --------------------------------------------------------------
type RootLayoutProps = {
  imgLink?: string;
  children: ReactNode;
};
// --------------------------------------------------------------

const RootLayout: FC<RootLayoutProps> = ({ children, imgLink }) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Grid container height="100%">
      <Grid item md={6} xs={12} order={downMd ? 2 : 1}>
        <FlexRowAlign
          sx={{
            padding: 4,
            height: "100%",
            backgroundColor: "grey.300",
          }}
        >
          <Box>
            <img width="100%" alt="Forget Password" src={imgLink} />
          </Box>
        </FlexRowAlign>
      </Grid>

      <Grid item md={6} xs={12} order={downMd ? 1 : 2}>
        {children}
      </Grid>
    </Grid>
  );
};

export default RootLayout;
