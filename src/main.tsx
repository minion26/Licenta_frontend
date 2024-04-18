import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header-main-page/Header.tsx";
import './index.css'
import MainPage from "./Header-main-page/Main-Page.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Header />
      <MainPage />
    {/*<App />*/}
  </React.StrictMode>,
)
