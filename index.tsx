import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Defensive initialization for hosting providers like CrazyDomain.
 * We wrap the root mounting in a try-catch to log environment-specific failures.
 */
const startApplication = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Target container '#root' not found in index.html.");
    }

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical: Failed to mount React application.", error);
    // Visual fallback for the user
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="padding: 40px; text-align: center; font-family: sans-serif;">
          <h2 style="color: #ef4444;">Unable to Load Application</h2>
          <p style="color: #64748b;">The server might be blocking script execution. Please check the browser console for details.</p>
        </div>
      `;
    }
  }
};

// Start the app
startApplication();