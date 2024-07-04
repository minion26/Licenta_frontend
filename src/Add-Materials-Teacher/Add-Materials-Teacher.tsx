import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Add-Materials-Teacher.module.css";
import UploadMaterialsTeachers from "../Upload-Materials-Teacher/Upload-Materials-Teacher.tsx";
import { useEffect, useState } from "react";
import { Course, materialsDTO } from "../types.ts";
import { useParams } from "react-router-dom";

function AddMaterialsTeacher() {
  const { idCourses } = useParams();
  const [materialsDTO, setMaterialsDTO] = useState<materialsDTO>({
    materialType: "course",
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMaterialsDTO({ materialType: event.target.value });
  };

  const [course, setCourse] = useState<Course>({
    idCourses: "",
    name: "",
    description: "",
    year: 0,
    semester: 0,
    credits: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [idCourses]);

  return (
    <div>
      <Header />
      <UpperHeader title={"Add Materials"} subtitle={course.name} />
      <div className={styles.container}>
        <select className={styles.selectStyle} onChange={handleSelectChange}>
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
