import { createRoot } from 'react-dom/client'
import { initializeEmailJS } from './lib/emailjs';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Initialize EmailJS when app starts
initializeEmailJS();
