import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign WebSocket/HMR errors in sandboxed preview environments
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || String(event.reason);
  if (message.includes('WebSocket') || message.includes('websocket') || message.includes('WS')) {
    event.preventDefault();
  }
});

window.addEventListener('error', (event) => {
  const message = event.message || '';
  if (message.includes('WebSocket') || message.includes('websocket') || message.includes('WS')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
