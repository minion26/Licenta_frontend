import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ViewCourseTeacher from "./View-Course-Teacher/View-Course-Teacher.tsx";

import MainPage from "./Main-page/Main-Page.tsx";
import Login from "./Login/Login.tsx";

// import MainPageStudents from "./Main-page-students/Main-Page-Students.tsx";
// import CoursesPageStudents from "./Courses-Page-Students/Courses-Page-Students.tsx";
// import LecturePerCourseStudents from "./Lecture-Per-Course-Students/Lecture-Per-Course-Students.tsx";
// import HomeworkHistoryStudents from "./Homework-History-Students/Homework-History-Students.tsx";
// import MaterialsPerLectureStudents from "./Materials-Per-Lecture-Students/Materials-Per-Lecture-Students.tsx";
// import ViewCourseStudents from "./View-Course-Students/View-Course-Students.tsx";
// import SeeHomeworkAnnouncementStudent from "./See-Homework-Announcement-Student/See-Homework-Announcement-Student.tsx";
// import AddHomeworkStudent from "./Add-Homework-Student/Add-Homework-Student.tsx";
// import MyProfile from "./My-Profile/My-Profile.tsx";

// import MainPageTeacher from "./Main-Page-Teacher/Main-Page-Teacher.tsx";
// import LecturesPerCourseTeachers from "./Lecture-Per-Course-Teacher/Lectures-Per-Course-Teachers.tsx";
// import MaterialsPerCourseTeacher from "./Materials-Per-Course-Teacher/Materials-Per-Course-Teacher.tsx";
// import ViewCourseTeacher from "./View-Course-Teacher/View-Course-Teacher.tsx";
// import HomeworksPerLectureTeacher from "./Homeworks-Per-Lecture-Teacher/Homeworks-Per-Lecture-Teacher.tsx";
// import FeedbackPerHomeworkTeacher from "./Feedback-Per-Homework-Teacher/Feedback-Per-Homework-Teacher";
// import NotificationsTeacher from "./Notifications-Teacher/Notifications-Teacher.tsx";
// import MyProfile from "./My-Profile/My-Profile.tsx";
// import HomeworkAnnouncementTeacher from "./Homework-Announcement-Teacher/Homework-Announcement-Teacher.tsx";
// import SeeHomeworkAnnouncementTeacher from "./See-Homework-Announcemet-Teacher/See-Homework-Announcemet-Teacher.tsx";
// import EditHomeworkAnnouncementsTeacher
//   from "./Edit-Homework-Announcements-Teacher/Edit-Homework-Announcements-Teacher.tsx";
// import AddMaterialsTeacher from "./Add-Materials-Teacher/Add-Materials-Teacher.tsx";
// import CreateTestTeacher from "./Create-Test-Teacher/Create-Test-Teacher.tsx";
// import SeeTestsTeacher from "./See-Tests-Teacher/See-Tests-Teacher.tsx";
// import EditTestTeacher from "./Edit-Test-Teacher/Edit-Test-Teacher.tsx";
// import AddQuestionsTestTeacher from "./Add-Questions-Test-Teacher/Add-Questions-Test-Teacher.tsx";
// import AddCorrectAnswersTestTeacher from "./Add-Correct-Answers-Test-Teacher/Add-Correct-Answers-Test-Teacher.tsx";
// import UploadStudentsToTestTeacher from "./Upload-Students-To-Test-Teacher/Upload-Students-To-Test-Teacher.tsx";
// import NeedsReviewTeacher from "./Needs-Review-Teacher/Needs-Review-Teacher.tsx";

import MainPageAdmin from "./Main-Page-Admin/Main-Page-Admin.tsx";
import CreateStudentsAdmin from "./Create-Students-Admin/Create-Students-Admin.tsx";
import MyProfile from "./My-Profile/My-Profile.tsx";
import UploadStudentsAdmin from "./Upload-Students-Admin/Upload-Students-Admin.tsx";
import SeeStudentsAdmin from "./See-Students-Admin/See-Students-Admin.tsx";
import SeeStudentAccountAdmin from "./See-Student-Account-Admin/See-Student-Account-Admin.tsx";
import CreateTeachersAdmin from "./Create-Teachers-Admin/Create-Teachers-Admin.tsx";
import UploadTeachersAdmin from "./Upload-Teachers-Admin/Upload-Teachers-Admin.tsx";
import SeeTeachersAdmin from "./See-Teachers-Admin/See-Teachers-Admin.tsx";
import SeeTeacherAccountAdmin from "./See-Teacher-Account-Admin/See-Teacher-Account-Admin.tsx";
import CreateAdmins from "./Create-Admins/Create-Admins.tsx";
import CreateCourseAdmin from "./Create-Course-Admin/Create-Course-Admin.tsx";
import UploadCoursesAdmin from "./Upload-Courses-Admin/Upload-Courses-Admin.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<ViewCourseTeacher/>} />*/}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />

        {/*STUDENTS*/}
        {/*<Route path="/main-page-student" element={<MainPageStudents />} />*/}
        {/*<Route path="semester1" element={<CoursesPageStudents />} />*/}
        {/*<Route path="semester2" element={<CoursesPageStudents />} />*/}
        {/*<Route path="lecture-per-course" element={<LecturePerCourseStudents />} />*/}
        {/*<Route path="homework" element={<HomeworkHistoryStudents />} />*/}
        {/*<Route path={"/my-profile"} element={<MyProfile />} />*/}
        {/*<Route path="/materials-per-lecture" element={<MaterialsPerLectureStudents />} />*/}
        {/*<Route path={"/view-course"} element={<ViewCourseStudents />} />*/}
        {/*<Route path={"/see-homework-announcement-student"} element={<SeeHomeworkAnnouncementStudent />} />*/}
        {/*<Route path={"/add-homework-student"} element={<AddHomeworkStudent />} />*/}

        {/*TEACHERS*/}
        {/*<Route path="/main-page-teacher" element={<MainPageTeacher />} />*/}
        {/*<Route path="/lecture-per-course" element={<LecturesPerCourseTeachers />}/>*/}
        {/*<Route path="/materials-per-lecture" element={<MaterialsPerCourseTeacher />}/>*/}
        {/*<Route path={"/view-course-teacher"} element={<ViewCourseTeacher />} />*/}
        {/*<Route path={"/homeworks-per-lecture"} element={<HomeworksPerLectureTeacher />}/>*/}
        {/*<Route path={"/add-feedback"} element={<FeedbackPerHomeworkTeacher />}/>*/}
        {/*<Route path={"/notifications-teacher"} element={<NotificationsTeacher />}/>*/}
        {/*<Route path={"/my-profile"} element={<MyProfile />} />*/}
        {/*<Route path={"/add-homework-announcement"} element={<HomeworkAnnouncementTeacher />} />*/}
        {/*<Route path={"/see-homework-announcement"} element={<SeeHomeworkAnnouncementTeacher />} />*/}
        {/*<Route path={"/edit-homework-announcement"} element={<EditHomeworkAnnouncementsTeacher /> } />*/}
        {/*<Route path={"/add-materials-per-lecture"} element={<AddMaterialsTeacher />} />*/}
        {/*<Route path={"/create-test"} element={<CreateTestTeacher />} />*/}
        {/*<Route path={"/see-tests"} element={<SeeTestsTeacher />} />*/}
        {/*<Route path={"/edit-test"} element={<EditTestTeacher />} />*/}
        {/*<Route path={"/add-questions-test"} element={<AddQuestionsTestTeacher />} />*/}
        {/*<Route path={"/add-correct-answers"} element={<AddCorrectAnswersTestTeacher />} />*/}
        {/*<Route path={"/add-students-to-test"} element={<UploadStudentsToTestTeacher />} />*/}
        {/*<Route path={"/add-review"} element={<NeedsReviewTeacher />} />*/}


        {/* ADMINS */}
        <Route path={"/main-page-admin"} element={<MainPageAdmin />} />
        <Route path={"/create-students-admin"} element={<CreateStudentsAdmin />} />
        <Route path={"/my-profile"} element={<MyProfile />} />
        <Route path={"/upload-students-admin"} element={<UploadStudentsAdmin />} />
        <Route path={"/see-students-admin"} element={<SeeStudentsAdmin />} />
        <Route path={"/see-student-account-admin"} element={<SeeStudentAccountAdmin />} />
        <Route path={"/create-teachers-admin"} element={<CreateTeachersAdmin />} />
        <Route path={"/upload-teachers-admin"} element={<UploadTeachersAdmin />} />
        <Route path={"/see-teachers-admin"} element={<SeeTeachersAdmin />} />
        <Route path={"/see-teacher-account-admin"} element={<SeeTeacherAccountAdmin />} />
        <Route path={"/create-admins"} element={<CreateAdmins />} />
        <Route path={"/create-course"} element={<CreateCourseAdmin />} />
        <Route path={"/upload-courses"} element={<UploadCoursesAdmin />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
