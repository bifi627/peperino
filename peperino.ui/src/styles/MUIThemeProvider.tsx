import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { darkTheme, getDefaultTheme, globalStyles, lightTheme } from "./CustomTheme";

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { resolvedTheme } = useTheme();

    const [currentTheme, setCurrentTheme] = useState(getDefaultTheme() === "dark" ? darkTheme : lightTheme);

    useEffect(() => {
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