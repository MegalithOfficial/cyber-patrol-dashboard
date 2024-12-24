import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const isMobileDevice = () => {
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent)
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isMobileDevice() ? (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 p-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-6 text-center max-w-md">
          <h1 className="text-xl font-bold text-cyan-400 mb-3">Desktop Only</h1>
          <p className="text-cyan-300/70">
            This website is not designed for smartphones. Please access it from a desktop computer for the best experience.
          </p>
        </div>
      </div>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
