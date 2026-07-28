import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PopupApp from './PopupApp';
import './popup.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  rootEl.classList.add('euclid-popup-root');
  createRoot(rootEl).render(
    <StrictMode>
      <PopupApp />
    </StrictMode>
  );
}
