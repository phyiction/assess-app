import './scss/styles.scss';
import { createRoot } from 'react-dom/client';
import { WWGAssessApp } from './App.jsx';

// Assumes HTML template has an element with an id set to 'root'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WWGAssessApp />);