import { darkTheme, lightTheme, Theme } from "@/constants/Theme";
import { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeContextType {
    theme: ThemeType;
    colors: Theme;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const deviceTheme = useColorScheme() ?? "light";
    const [theme, setTheme] = useState<ThemeType>(deviceTheme);

    const colors = theme === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, colors, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error(
            "useTheme must be used within a ThemeProvider, " + context
        );
    }
    return context;
};
