import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./View-Course-Students.module.css";
import PDFViewer from "../PDF-viewer/PDF-viewer.tsx";

function ViewCourseStudents() {
  return (
    <div>
      <Header />
      <UpperHeader title="WEEK 1" subtitle="Course" />
      <div className={styles.container}>
        <PDFViewer fileURL={"src/assets/licenta - figma.pdf"} />
      </div>
    </div>
  );
}

export default ViewCourseStudents;
