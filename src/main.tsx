import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./Main-page/Main-Page.tsx";
import Login from "./Login/Login.tsx";
import MainPageStudents from "./Main-page-students/Main-Page-Students.tsx";
import CoursesPageStudents from "./Courses-Page-Students/Courses-Page-Students.tsx";
import LecturePerCourseStudents from "./Lecture-Per-Course-Students/Lecture-Per-Course-Students.tsx";
import HomeworkHistoryStudents from "./Homework-History-Students/Homework-History-Students.tsx";
import MaterialsPerLectureStudents from "./Materials-Per-Lecture-Students/Materials-Per-Lecture-Students.tsx";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              {/*<Route path="/main-page-teacher" element={<MainPageTeacher />} />*/}
              <Route path="/main-page-student" element={<MainPageStudents />} />
              <Route path="semester1" element={<CoursesPageStudents />} />
                <Route path="semester2" element={<CoursesPageStudents />} />
              <Route path="lecture-per-course" element={<LecturePerCourseStudents />} />
              <Route path="homework" element={<HomeworkHistoryStudents />} />
              <Route path="/materials-per-lecture" element={<MaterialsPerLectureStudents />} />
          </Routes>
      </BrowserRouter>

  </React.StrictMode>
)
