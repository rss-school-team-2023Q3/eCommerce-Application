import { createTheme } from '@mui/material';
import { COLOR } from 'shared/constants';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TypeBackground {
    input?: string;
  }
  // type Palette = {
  //   background: TypeBackground;
  // }

  // type PaletteOptions = {
  //   background?: TypeBackground;
  // }
}

const lightTheme = createTheme({
  // breakpoints: {
  //   values: {
  //     xs:0,
  //     sm: 375,
  //     md: 768,
  //     lg: 1440,
  //   },
  // },
  palette: {
    mode: 'light',
    primary: {
      main: COLOR.main,
    },
    secondary: {
      main: COLOR.second,
    },
    // dark: {
    //   main: COLOR.dark,
    // },
    text: {
      primary: '#001833',
      secondary: COLOR.primaryText,
      // hover: COLOR.dark,
    },
    // middleCube: '#22252a',
    background: {
      default: COLOR.second,
      input: 'white',
      // buttonSearch: COLOR.dark,
      // buttonSearchHover: COLOR.main,
      // paginator: '#EBF3D4',
      // header: COLOR.dark,
      // btnSub: COLOR.main,
    },
    // paginator: {
    //   active: '#22252A',
    //   inactive: '#656565',
    // },
    // iconHeader: COLOR.main,
    // iconHeaderHover: COLOR.second,
  },
});

// DARK THEME
const darkTheme = createTheme({
  ...lightTheme,

  palette: {
    mode: 'dark',
    primary: {
      main: COLOR.main,
    },
    secondary: {
      main: COLOR.second,
    },
    // dark: {
    //   main: COLOR.dark,
    // },
    background: {
      default: COLOR.primaryText,
      // input: COLOR.darkThemeInput,
      // buttonSearch: COLOR.main,
      // buttonSearchHover: 'transparent',
      // paginator: COLOR.main,
      // header: COLOR.main,
      // btnSub: COLOR.dark,
    },
    text: {
      primary: COLOR.second,
      // primary: "#FFD700",
      // input: COLOR.second,
      secondary: COLOR.second,
      // secondary: "#FFD700",
      // hover: COLOR.main,
    },
    // paginator: {
    //   active: COLOR.second,
    //   inactive: 'rgba(250, 250, 250, 0.60)',
    // },
  },
});

const THEME = { lightTheme, darkTheme };

export default THEME;
