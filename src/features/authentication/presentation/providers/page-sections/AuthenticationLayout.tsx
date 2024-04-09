import { Grid, Stack, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { H1 } from "shared/components/Typography";
import { FC, ReactNode } from "react";
import ContentSlider from "./ContentSlider";

// -------------------------------------------------------
type PropsTypes = {
  children: ReactNode;
  title: string;
};
// -------------------------------------------------------

const AuthenticationLayout: FC<PropsTypes> = (props) => {
  const { children, title, } = props;
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Grid container height="100%">
      <Grid item md={6} xs={12} order={downMd ? 2 : 1}>
        <ContentSlider />
      </Grid>

      <Grid item md={6} xs={12} order={downMd ? 1 : 2}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Box textAlign="center" maxWidth={550} width="100%" padding={4}>
            <img src="/static/logo/logo.svg" width={40} alt="Logo" />
            <H1 fontWeight={700} fontSize={24} mt={2}>
              {title}
            </H1>
            {children}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthenticationLayout;
