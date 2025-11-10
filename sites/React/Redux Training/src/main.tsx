import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store";

import { worker } from './mocks/browser.ts';

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </StrictMode>,
)
