// Dependencies
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
// Context
import AppProvider from './AppContext.tsx';
// Components
import App from './App.tsx';
// Styles
import theme from './themes/theme.ts';
import './styles/index.css';
import initBaseThemes from './themes/editor/baseThemes.ts';

// Initialize editor base themes
initBaseThemes();

// Render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
