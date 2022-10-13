import { useEffect } from 'react';
import { createContext, useState } from 'react';

const ThemesColors = {
    dark: {
        main_color: '#e11a38',
        primary_color: '#ff9f00',
        black: '#000',
        white: '#fff',
    },
    light: {
        main_color: '#ff9f00',
        primary_color: '#e11a38',
        black: '#ddd',
        white: '#000',
    }
}

export const ThemeAppContext = createContext();

const AppThemeProvider = ({ children })=> {
    
    function CssColorsHandler(typeColor, coo) {
        document.documentElement.style.setProperty(typeColor, coo)
    };

    const [IsDark, setIsDark] = useState(true);

    const theme = IsDark ?<>
        { ThemesColors.dark }
        {CssColorsHandler('--main-color',ThemesColors.dark.main_color)}{CssColorsHandler('--primary-color',ThemesColors.dark.primary_color)}
        {CssColorsHandler('--black',ThemesColors.dark.black)}{CssColorsHandler('--white',ThemesColors.dark.white)}
    </> :<>
    { ThemesColors.light }
    {CssColorsHandler('--main-color',ThemesColors.light.main_color)}{CssColorsHandler('--primary-color',ThemesColors.light.primary_color)}
    {CssColorsHandler('--black',ThemesColors.light.black)}{CssColorsHandler('--white',ThemesColors.light.white)}
    </>;
    
    const toggleTheme = ()=> {
        localStorage.setItem('DojoThemeMode', JSON.stringify(IsDark));
        setIsDark(!IsDark);
    };

    useEffect(()=> {
        if(localStorage.getItem('DojoThemeMode')) {
            const IsDark = localStorage.getItem('DojoThemeMode') === 'false';
            setIsDark(IsDark)
        }
    }, []);

    return (
        <ThemeAppContext.Provider value={[{theme, IsDark},  toggleTheme]}>
            { children }
        </ThemeAppContext.Provider>
    )

};

export default AppThemeProvider;