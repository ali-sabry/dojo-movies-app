import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesHandlerProvider } from './store/Store';
import AppThemeProvider from './theme/Theme';

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