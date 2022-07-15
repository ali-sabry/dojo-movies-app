import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesHandlerProvider } from './components/global/Store';
import  AppThemeProvider  from './components/global/Theme';

import App from './App';
import './index.css';

ReactDOM.render(
    <AppThemeProvider>
    <FavoritesHandlerProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FavoritesHandlerProvider>
    </AppThemeProvider>,
    document.getElementById('root')
)