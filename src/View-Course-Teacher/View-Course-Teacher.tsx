import styles from "./View-Course-Teacher.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import PDFViewer from "../PDF-viewer/PDF-viewer.tsx";

function ViewCourseTeacher() {
  return (
    <div>
      <Header />
      <UpperHeader title="WEEK 1" subtitle="Course" />
      <div className={styles.container}>
        <PDFViewer documentURL={"src/assets/licenta - figma.pdf"} />
      </div>
    </div>
  );
}

export default ViewCourseTeacher;
