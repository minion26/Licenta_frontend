import {Route, Routes} from "react-router-dom";
import MainPage from "./Main-page/Main-Page.tsx";
import Login from "./Login/Login.tsx";
import MainPageStudents from "./Main-page-students/Main-Page-Students.tsx";
import CoursesPageStudents from "./Courses-Page-Students/Courses-Page-Students.tsx";
import LecturePerCourseStudents from "./Lecture-Per-Course-Students/Lecture-Per-Course-Students.tsx";
import HomeworkHistoryStudents from "./Homework-History-Students/Homework-History-Students.tsx";
import MyProfileTeacher from "./My-Profile-Teacher/My-Profile-Teacher.tsx";
import MaterialsPerLectureStudents from "./Materials-Per-Lecture-Students/Materials-Per-Lecture-Students.tsx";
import ViewCourseStudents from "./View-Course-Students/View-Course-Students.tsx";
import SeeHomeworkAnnouncementStudent from "./See-Homework-Announcement-Student/See-Homework-Announcement-Student.tsx";
import AddHomeworkStudent from "./Add-Homework-Student/Add-Homework-Student.tsx";
import SeeTestsStudent from "./See-Tests-Student/See-Tests-Student.tsx";
import TakeTestsStudent from "./Take-Tests-Student/Take-Tests-Student.tsx";
import MainPageTeacher from "./Main-Page-Teacher/Main-Page-Teacher.tsx";
import LecturesPerCourseTeachers from "./Lecture-Per-Course-Teacher/Lectures-Per-Course-Teachers.tsx";
import MaterialsPerCourseTeacher from "./Materials-Per-Course-Teacher/Materials-Per-Course-Teacher.tsx";
import ViewCourseTeacher from "./View-Course-Teacher/View-Course-Teacher.tsx";
import HomeworksPerLectureTeacher from "./Homeworks-Per-Lecture-Teacher/Homeworks-Per-Lecture-Teacher.tsx";
import FeedbackPerHomeworkTeacher from "./Feedback-Per-Homework-Teacher/Feedback-Per-Homework-Teacher";
import NotificationsTeacher from "./Notifications-Teacher/Notifications-Teacher.tsx";
import HomeworkAnnouncementTeacher from "./Homework-Announcement-Teacher/Homework-Announcement-Teacher.tsx";
import SeeHomeworkAnnouncementTeacher from "./See-Homework-Announcemet-Teacher/See-Homework-Announcemet-Teacher.tsx";
import EditHomeworkAnnouncementsTeacher
    from "./Edit-Homework-Announcements-Teacher/Edit-Homework-Announcements-Teacher.tsx";
import AddMaterialsTeacher from "./Add-Materials-Teacher/Add-Materials-Teacher.tsx";
import CreateTestTeacher from "./Create-Test-Teacher/Create-Test-Teacher.tsx";
import SeeTestsTeacher from "./See-Tests-Teacher/See-Tests-Teacher.tsx";
import EditTestTeacher from "./Edit-Test-Teacher/Edit-Test-Teacher.tsx";
import AddQuestionsTestTeacher from "./Add-Questions-Test-Teacher/Add-Questions-Test-Teacher.tsx";
import AddCorrectAnswersTestTeacher from "./Add-Correct-Answers-Test-Teacher/Add-Correct-Answers-Test-Teacher.tsx";
import UploadStudentsToTestTeacher from "./Upload-Students-To-Test-Teacher/Upload-Students-To-Test-Teacher.tsx";
import NeedsReviewTeacher from "./Needs-Review-Teacher/Needs-Review-Teacher.tsx";
import MainPageAdmin from "./Main-Page-Admin/Main-Page-Admin.tsx";
import CreateStudentsAdmin from "./Create-Students-Admin/Create-Students-Admin.tsx";
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
import AddTeacherToCoursesAdmin from "./Add-Teacher-To-Courses-Admin/Add-Teacher-To-Courses-Admin.tsx";
import SeeCoursesAdmin from "./See-Courses-Admin/See-Courses-Admin.tsx";
import SeeCoursesAccountAdmin from "./See-Courses-Account-Admin/See-Courses-Account-Admin.tsx";
import AddStudentsToCoursesAdmin from "./Add-Students-To-Courses-Admin/Add-Students-To-Courses-Admin.tsx";

import {AuthProvider, useAuth} from './AuthContext';
import SeeAdminsAdmin from "./See-admins-admin/See-admins-admin.tsx";
import SeeTeachersPerCourseAdmin from "./See-Teachers-Per-Course-Admin/See-Teachers-Per-Course-Admin.tsx";
import AddSingleTeacherToCourseAdmin from "./Add-Single-Teacher-To-Course-Admin/Add-Single-Teacher-To-Course-Admin.tsx";
import SeeStudentsPerCourseAdmin from "./See-Students-Per-Course-Admin/See-Students-Per-Course-Admin.tsx";
import {useEffect} from "react";
import MyProfileAdmin from "./My-Profile-Admin/My-Profile-Admin.tsx";
import DeleteMaterialsPerLectureTeacher
    from "./Delete-Materials-Per-Lecture-Teacher/Delete-Materials-Per-Lecture-Teacher.tsx";
import SeeSubmissionsHomeworkTeacher from './See-Submissions-Homework-Teacher/See-Submissions-Homework-Teacher.tsx';
import SeeStudentsPerTestTeacher from "./See-Students-Per-Test-Teacher/See-Students-Per-Test-Teacher.tsx";
import SeeStudentsAnswersToQuestionsPerTestTeacher
    from "./See-Students-Answers-To-Questions-Per-Test-Teacher/See-Students-Answers-To-Questions-Per-Test-Teacher.tsx";
import SeeHomeworkAnnouncementDetailsStudent
    from "./See-Homework-Announcement-Details-Student/See-Homework-Announcement-Details-Student.tsx";

function App() {


    return (
        <AuthProvider>
            <RoutesComponent />
        </AuthProvider>
    );
}

function RoutesComponent() {
    const { role, setRole } = useAuth();


    useEffect(() => {
        // Get the role from the server
        fetch('http://localhost:8081/api/v1/role', {
            method: 'GET',
            credentials: 'include', // This will include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with status code ${response.status}`);
                }

                // If the role is successfully fetched, navigate to the main page
                // navigate('/main-page-teacher');

                return response.json();

            })
            .then(data => {
                console.log(data);
                setRole(data);
            })
            .catch(error => {
                console.error('Failed to get role', error);
                // If the fetch fails, navigate to the login page
                // navigate('/login');
            });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />

            {/*STUDENTS*/}
            {role == 3 && (
                <>
                    <Route path={"/main-page-student"} element={<MainPageStudents />} />
                    <Route path={"/semester/:semesterNumber"} element={<CoursesPageStudents />} />
                    <Route path={"/lecture-per-course/:idCourses"} element={<LecturePerCourseStudents />} />
                <Route path={"/homework"} element={<HomeworkHistoryStudents />} />
                <Route path={"/my-profile"} element={<MyProfileTeacher />} />
                    <Route path={"/materials-per-lecture/:idCourses/:idLecture"} element={<MaterialsPerLectureStudents />} />
                    <Route path={"/view-course/:idCourses/:idLecture/:materialType"} element={<ViewCourseStudents />} />
                    <Route path={"/see-homework-announcement/:idCourses/:idLecture"} element={<SeeHomeworkAnnouncementStudent />} />
                    <Route path={"/see-homework-details/:idHomeworkAnnouncement"} element={<SeeHomeworkAnnouncementDetailsStudent />} />
                <Route path={"/add-homework/:idHomeworkAnnouncement"} element={<AddHomeworkStudent />} />
                <Route path={"/tests"} element={<SeeTestsStudent />} />
                <Route path={"/take-test"} element={<TakeTestsStudent />} />
                </>
            )}



            {/*TEACHERS*/}
                {role == 2 && (
                    <>
                            <Route path="/main-page-teacher" element={<MainPageTeacher />} />
                            <Route path="/lecture-per-course/:idCourses" element={<LecturesPerCourseTeachers />}/>
                            <Route path="/materials-per-lecture/:idCourses/:idLectures" element={<MaterialsPerCourseTeacher />}/>
                            <Route path={"/view-course-teacher/:idCourses/:idLectures/:materialType"} element={<ViewCourseTeacher />} />
                            <Route path={"/view-auxiliar-teacher/:idCourses/:idLectures/:materialType"} element={<ViewCourseTeacher />} />
                            <Route path={"/view-video-teacher/:idCourses/:idLectures/:materialType"} element={<ViewCourseTeacher />} />
                            <Route path={"/homeworks-per-lecture/:idCourses/:idLectures"} element={<HomeworksPerLectureTeacher />}/>
                            <Route path={"/see-submissions/:idHomeworkAnnouncement"} element={<SeeSubmissionsHomeworkTeacher />}/>
                            <Route path={"/add-feedback/:idHomeworkAnnouncement/:idHomework"} element={<FeedbackPerHomeworkTeacher />}/>
                            <Route path={"/notifications-teacher"} element={<NotificationsTeacher />}/>
                            <Route path={"/my-profile"} element={<MyProfileTeacher />} />
                            <Route path={"/add-homework-announcement/:idCourses/:idLectures"} element={<HomeworkAnnouncementTeacher />} />
                            <Route path={"/see-homework-announcement/:idCourses/:idLectures"} element={<SeeHomeworkAnnouncementTeacher />} />
                            <Route path={"/edit-homework-announcement/:idHomeWorkAnnouncement"} element={<EditHomeworkAnnouncementsTeacher /> } />
                            <Route path={"/add-materials-per-lecture/:idLectures"} element={<AddMaterialsTeacher />} />
                            <Route path={"/create-test/:idCourses"} element={<CreateTestTeacher />} />
                            <Route path={"/see-tests/:idCourses"} element={<SeeTestsTeacher />} />
                            <Route path={"/see-students-test/:idExam"} element={<SeeStudentsPerTestTeacher />} />
                            <Route path={"/edit-test/:idCourses/:idExam"} element={<EditTestTeacher />} />
                            <Route path={"/add-questions-test/:idExam"} element={<AddQuestionsTestTeacher />} />
                            <Route path={"/add-correct-answers/:idExam"} element={<AddCorrectAnswersTestTeacher />} />
                            <Route path={"/add-students-to-test/:idCourses/:idExam"} element={<UploadStudentsToTestTeacher />} />
                            <Route path={"/add-review/:idStudentAnswerExam"} element={<NeedsReviewTeacher />} />
                            <Route path={"/delete-materials-per-lecture/:idLectures"} element={<DeleteMaterialsPerLectureTeacher />} />
                            <Route path={"/see-students-answers-per-test/:idExam/:idStudent"} element={<SeeStudentsAnswersToQuestionsPerTestTeacher />} />
                    </>
                )}



            {/* ADMINS */}
                {role == 1 && (
                    <>
                            <Route path={"/main-page-admin"} element={<MainPageAdmin />} />
                            <Route path={"/create-students-admin"} element={<CreateStudentsAdmin />} />
                            <Route path={"/my-profile"} element={<MyProfileAdmin />} />
                            <Route path={"/upload-students-admin"} element={<UploadStudentsAdmin />} />
                            <Route path={"/see-students-admin"} element={<SeeStudentsAdmin />} />
                            <Route path={"/see-student-account-admin/:idUsers"} element={<SeeStudentAccountAdmin />} />
                            <Route path={"/create-teachers-admin"} element={<CreateTeachersAdmin />} />
                            <Route path={"/upload-teachers-admin"} element={<UploadTeachersAdmin />} />
                            <Route path={"/see-teachers-admin"} element={<SeeTeachersAdmin />} />
                            <Route path={"/see-teacher-account-admin/:idUsers"} element={<SeeTeacherAccountAdmin />} />
                            <Route path={"/students-per-course/:idCourses"} element={<SeeStudentsPerCourseAdmin />} />
                            <Route path={"/create-admins"} element={<CreateAdmins />} />
                            <Route path={"/see-admins"} element={<SeeAdminsAdmin />} />
                            <Route path={"/create-course"} element={<CreateCourseAdmin />} />
                            <Route path={"/upload-courses"} element={<UploadCoursesAdmin />} />
                            <Route path={"/add-teachers-to-courses"} element={<AddTeacherToCoursesAdmin />} />
                            <Route path={"/add-single-teacher-per-course/:idCourses"} element={<AddSingleTeacherToCourseAdmin />} />
                            <Route path={"/teachers-per-course/:idCourses"} element={<SeeTeachersPerCourseAdmin />} />
                            <Route path={"/see-courses"} element={<SeeCoursesAdmin />} />
                            <Route path={"/see-course-account/:idCourses"} element={<SeeCoursesAccountAdmin />} />
                            <Route path={"/add-students-to-courses"} element={<AddStudentsToCoursesAdmin />} />
                    </>
                )}


        </Routes>
    );
}

export default App



