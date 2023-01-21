import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// This is telling react to create whatever's in the 'root.render' (<App /> [app.js])
// at the position of this command 'root' which is in the public/index.hmtml file 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);