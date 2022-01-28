/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css, ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SinglePlayer from './routes/SinglePlayer';
import Home from './routes/Home';
import MultiPlayer from './routes/MultiPlayer';

const theme = {
  colors: {
    primary: 'var(--primary)',
    primaryLight: 'var(--primary-light)',
    secondary: 'var(--secondary)',
    secondaryLight: 'var(--secondary-light)',
    accent: 'var(--accent)',
    accentLight: 'var(--accent-light)',
    splash: 'var(--splash)',
    splashLight: 'var(--splash-light)'
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="single-player" element={<SinglePlayer />} />
            <Route path="multi-player" element={<MultiPlayer />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
