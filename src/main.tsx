import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MainPageStudents from "./Main-page-students/Main-Page-Students.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MainPageStudents />
    {/*<App />*/}
  </React.StrictMode>,
)
