import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import UploadMaterialsTeachers from "../Upload-Materials-Teacher/Upload-Materials-Teacher.tsx";
import styles from "./Add-Homework-Student.module.css";

function AddHomeworkStudent(){
    return (
        <div>
            <Header />
            <UpperHeader title={"Add the homework"} subtitle={"Course Name"} />
            <div className={styles.container}>
                <UploadMaterialsTeachers />
            </div>
        </div>
    );
}

export default AddHomeworkStudent;