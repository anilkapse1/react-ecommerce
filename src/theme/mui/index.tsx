import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { IReactProp } from "../../models/IReactProp";
import overrideTypography from "./overrideTypography";

const ThemeComponent = ({ children }: IReactProp) => {
  // Start with the default MUI theme
  let baseTheme = createTheme();

  // Apply custom palette and typography
  const theme = createTheme({
    ...baseTheme,
    typography: overrideTypography(baseTheme),
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeComponent;
