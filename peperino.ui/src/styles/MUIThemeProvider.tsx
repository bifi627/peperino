import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { darkTheme, DEFAULT_THEME, globalStyles, lightTheme } from "./CustomTheme";

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME === "dark" ? darkTheme : lightTheme);

    useEffect(() => {
        console.log(resolvedTheme);
        resolvedTheme === "light"
            ? setCurrentTheme(lightTheme)
            : setCurrentTheme(darkTheme);
    }, [resolvedTheme]);

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            {children}
        </ThemeProvider>
    );
};

export default MUIThemeProvider;