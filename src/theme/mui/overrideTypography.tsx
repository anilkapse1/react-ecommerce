import type { Theme, ThemeOptions } from "@mui/material/styles";

const overrideTypography = (baseTheme: Theme): ThemeOptions["typography"] => ({
  ...baseTheme.typography,
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: {
    ...baseTheme.typography.h1,
    fontSize: 30,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "42px",
    letterSpacing: "-0.01562em",
  },
  h2: {
    ...baseTheme.typography.h2,
    fontSize: 24,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "33.6px",
    letterSpacing: "0px !important",
  },
  h3: {
    ...baseTheme.typography.h3,
    fontSize: 20,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "28px",
  },
  h4: {
    ...baseTheme.typography.h4,
    fontSize: 16,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "24px",
  },
  h5: {
    ...baseTheme.typography.h5,
    fontSize: 16,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "24px",
    letterSpacing: "0.18px",
  },
  body1: {
    ...baseTheme.typography.body1,
    fontSize: 14,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "22px",
    wordBreak: "break-word",
  },
  body2: {
    ...baseTheme.typography.body2,
    fontSize: 12,
    fontFamily: "Lato Regular, sans-serif",
    lineHeight: "20px",
  },
  button: {
    fontSize: 14,
    fontWeight: "medium",
    textTransform: "none",
    lineHeight: "22px",
    letterSpacing: "0.5px",
    fontFamily: "Lato Regular, sans-serif",
  },
});

export default overrideTypography;
