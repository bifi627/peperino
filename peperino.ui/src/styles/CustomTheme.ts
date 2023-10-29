// https://bareynol.github.io/mui-theme-creator/#
// https://mui.com/material-ui/customization/dark-mode/

import { createTheme, css, PaletteOptions } from "@mui/material/styles";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;

export const DEFAULT_THEME: AllowedTheme = "dark";

export const getDefaultTheme = () => {
  return "dark";
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d943e",
    },
    secondary: {
      main: "#BF28D7"
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: "#9147FF" },
    secondary: { main: "#2a48f3" },
    mode: "dark",
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }
  [data-theme="dark"] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;