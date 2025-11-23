// @ts-ignore or // @ts-expect-error: 
import { createRoot } from 'react-dom/client'
import './index.css'
import "@tnbt/react-favorit-style/styles.css";
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/Vite-React-TS-Template">
    <App />
  </BrowserRouter>,
)
