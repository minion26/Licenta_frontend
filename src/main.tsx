import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import MainPageTeacher from "./Main-Page-Teacher/Main-Page-Teacher.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MainPageTeacher />
    {/*<App />*/}
  </React.StrictMode>,
)
