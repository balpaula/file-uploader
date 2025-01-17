import { useReducer } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Controls } from './components/Controls';
import { FileUploader } from './components/FileUploader';
import { ControlsOptions } from './core/model';
import { controlsReducer } from './helpers/reducers/controlsReducer';
import './App.scss';

// TODO: github actions to deploy to pages

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
    light_pink: {
      palette: {
        primary: {
          main: '#e91e63',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#ff4081',
        },
        background: {
          default: '#fff',
          paper: '#fff',
        },
        text: {
          primary: '#000000',
          secondary: '#333333',
        },
        common: { background: '#fff' },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

function App() {
  const initialControls: ControlsOptions = {
    theme: 'light',
    size: 'medium',
    isDisabled: false,
    isReversed: false,
  };

  const [controls, dispatch] = useReducer(controlsReducer, initialControls);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <AppBar position="relative">
          <Toolbar className="headerRow">
            <Typography variant="h6" component="h1">
              File Uploader
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="content">
          <Controls options={controls} handleControlChange={dispatch} />
          <FileUploader options={controls}></FileUploader>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
