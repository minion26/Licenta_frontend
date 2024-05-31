import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Add-Materials-Teacher.module.css";
import UploadMaterialsTeachers from "../Upload-Materials-Teacher/Upload-Materials-Teacher.tsx";

function AddMaterialsTeacher() {
  return (
    <div>
      <Header />
        <UpperHeader title={"Add Materials"} subtitle={"Course Name"} />
      <div className={styles.container}>
          <select >
          <option value="course">Course</option>
          <option value="auxiliar">Auxiliar</option>
          <option value="video">Video</option>
        </select>
        <UploadMaterialsTeachers />
      </div>
    </div>
  );
}
export default AddMaterialsTeacher;