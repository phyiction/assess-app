import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AssessApp from './App.jsx';

// Assumes HTML template has an element with an id set to 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AssessApp version="0.0.7" />
  </StrictMode>
);
