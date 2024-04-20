import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LecturePerCourseStudents from "./Lecture-Per-Course-Students/Lecture-Per-Course-Students.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <LecturePerCourseStudents />
    {/*<App />*/}
  </React.StrictMode>,
)
