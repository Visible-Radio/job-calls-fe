import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
  --greenText: rgb(0, 250, 200);
  --greyCyan: rgb(0, 200, 200);
  --brightCyan: rgb(0, 255, 255);
  --magenta: #6d1158;
  --brightMagenta: #e932bf;
  --yellow: rgb(240, 240, 0);
  --slate: #1c243a;
  --lightBlack: #001320;
  --disabledInput: rgb(113, 57, 14);
  --brightOrange: rgb(150, 255, 0);
  }

  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background: linear-gradient(180deg, #110a21, #1f2138) no-repeat center center
      fixed;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

