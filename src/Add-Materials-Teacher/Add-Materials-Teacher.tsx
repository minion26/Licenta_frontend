import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Add-Materials-Teacher.module.css";
import UploadMaterialsTeachers from "../Upload-Materials-Teacher/Upload-Materials-Teacher.tsx";
import {useState} from "react";
import {materialsDTO} from "../types.ts";

function AddMaterialsTeacher() {
    const [materialsDTO, setMaterialsDTO] = useState<materialsDTO>({ materialType: "course" });

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMaterialsDTO({ materialType: event.target.value });
    };


  return (
    <div>
      <Header />
        <UpperHeader title={"Add Materials"} subtitle={"Course Name"} />
      <div className={styles.container}>
          <select className={styles.selectStyle} onChange={handleSelectChange} >
          <option value="course">Course</option>
          <option value="auxiliar">Auxiliar</option>
          <option value="video">Video</option>
        </select>
        <UploadMaterialsTeachers materialsDTO={materialsDTO} />
      </div>
    </div>
  );
}
export default AddMaterialsTeacher;