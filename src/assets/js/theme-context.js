import { createContext } from "react"
export const themes = {
    light: {
        backgroundColor: '#b9b9b9',
        color: "black"
    }, 
    dark: {
        backgroundColor: '#2d2c38',
        color: 'white'
    }
}
export const defaultValue = {
    theme: themes.dark,
    toggleTheme: ()=>{
        this.theme = (this.theme === themes.dark ? themes.light : themes.dark);
    }
}
export const ThemeContext = createContext(defaultValue)