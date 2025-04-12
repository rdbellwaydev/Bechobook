import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext.jsx';
createRoot(document.getElementById('root')).render(
  
     <HashRouter>
    <AuthProvider>
        <CartProvider>
     <App />
     </CartProvider>
    </AuthProvider>
     </HashRouter>
  
)
