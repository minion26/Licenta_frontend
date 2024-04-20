import "./Lecture-Per-Course-Students.css";
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";

function LecturePerCourseStudents() {
  return (
    <div>
        <Header />
        <UpperHeader title="Course Name" subtitle="week 1"/>
        <div className="container">
            <CardElongated title="Lecture 1" description="bla bla" cardIndex={1}/>
            <CardElongated title="Lecture 2" description="bla bla" cardIndex={2}/>
        </div>
    </div>
  );
}

export default LecturePerCourseStudents;