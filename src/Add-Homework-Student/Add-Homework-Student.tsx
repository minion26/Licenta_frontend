import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Add-Homework-Student.module.css";
import UploadHomeworkStudents from "../Upload-Homework-Students/Upload-Homework-Students.tsx";
import {useParams} from "react-router-dom";
import {Course} from "../types.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";


function AddHomeworkStudent(){
    const {idCourses,idHomeworkAnnouncement} = useParams();

    const [courses, setCourses] = useState<Course>({
        idCourses: "",
        name: "",
        description: "",
        year: 0,
        semester: 0,
        credits: 0
    });


    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, []);

    return (
        <div>
            <Header />
            <UpperHeader title={"Add the homework"} subtitle={courses ? courses.name : ""} />
            <div className={styles.container}>
                <UploadHomeworkStudents idHomeworkAnnouncement={idHomeworkAnnouncement} />
            </div>
        </div>
    );
}

export default AddHomeworkStudent;