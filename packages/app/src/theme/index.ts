import { 
    createBaseThemeOptions, 
    createUnifiedTheme, 
    genPageTheme, 
    palettes,
    shapes
    
} from "@backstage/theme";

export const altiTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
        palette: {
            ...palettes.light, 
            background: {
                default: '#ffffff',
                paper: '#f4f4f4'
            },
            text: {
                primary: '#161616'
            },
            // Buttons
            primary: {
                main: '#0f62fe',
                dark: '#002d9c'
            },
            secondary: {
                main: '#393939',
                dark: '#4c4c4c'
            },
            navigation: {
                background: '#000000',
                indicator: '#0f62fe',
                color: '#8d8d8d',
                selectedColor: '#ffff',
            },
        },
    }),
    defaultPageTheme: 'home',
    fontFamily: 'Avenir Next',
    pageTheme: {
        home: genPageTheme({
            colors: ['#000000'],
            shape: shapes.wave // Options are wave, wave2, and round
            
        }),
    },
    
 });