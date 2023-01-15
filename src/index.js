import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>

);