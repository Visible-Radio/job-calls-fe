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
  --gradient1: #110a21;
  --gradient2: #1f2138;
  --gradient: linear-gradient(180deg, #110a21, #1f2138) no-repeat center center fixed;
  // brought these in with the pagination controls
  --pad: 2rem;
  --borad: 2rem;
  --maxWidth: 1200px;
  --fz: 1rem;
  --buttonWidth: 100px;
  --buttonMargin: 0.5rem;
  --textInputWidth: 200px;
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

  a {
    text-decoration: none;
  }

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--brightOrange) black;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 0.625rem;
  }

  *::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
    border-radius: 20px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--greyCyan);
    border-radius: 20px;
    border: 1px solid black;
  }

  body {

    background: var(--lightBlack);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--greyCyan);
  }

  // brought these in with pagination controls
  // should make more use of CSS vars for consistency & responsiveness
  @media screen and (max-width: 500px) {
    :root {
      --fz: 0.75rem;
      --pad: 1rem;
      --buttonWidth: 70px;
      --textInputWidth: 170px;
    }
  }
  @media screen and (max-width: 625px) {
    :root {
      --buttonMargin: 0rem 0rem 0.375rem 0rem;
      --orderAssignEnd: 1;
      --assignWidth100: 100%;
    }
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

