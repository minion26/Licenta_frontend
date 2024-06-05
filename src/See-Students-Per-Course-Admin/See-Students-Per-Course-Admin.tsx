import styles from "./See-Students-Per-Course-Admin.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {Course, StudentFollowCourse} from "../types.ts";
import {useEffect, useState} from "react";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function SeeStudentsPerCourseAdmin(){
    const {idCourses} = useParams();

    const[students, setStudents] = useState<StudentFollowCourse[]>([]);
    const [course, setCourse] = useState<Course>();

    const navigate = useNavigate();

    useEffect(() => {
            fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCourse(data);

                    // Now that we have the course data, we can fetch the students
                    return fetch(`http://localhost:8081/api/v1/students-follow-courses/${data.name}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    });
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setStudents(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }, []);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <Header/>
            <UpperHeader title={"See teachers"} subtitle={course?.name || ""}/>
            <div className={styles.cardContainer}>
                {students.length === 0 ? (
                    <Card
                        sx={{
                            // marginLeft: isSmallScreen ? "0px" : "200px",
                            // marginTop: "10px",
                            display: "flex",
                            flexDirection: "column",
                            width: isSmallScreen ? "100%" : "75%",
                            height: isSmallScreen ? "50%" : "auto",
                            backgroundColor: "#FAFAF5",
                            borderRadius: "24px",
                            alignSelf: "center",
                        }}
                    >
                        <div className={styles.title}>
                            <p className={styles.p}>
                                No students found for this course.
                            </p>
                            <p className={styles.p}>Please enroll the students.</p>
                        </div>
                    </Card>
                ) : (
                    students.map((student, index) => (
                        <CardElongated key={index} title={`${student.studentName} `} cardIndex={index} height={145}>
                            <Box sx={{display: "flex"}}>
                                <CardContent
                                    sx={{
                                        flex: "1 0 auto",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        endIcon={<DeleteIcon/>}
                                        sx={{
                                            width: "50px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                        fontFamily: "Inter",
                                        fontSize: "12px",
                                        fontWeight: "semi-bold",
                                        alignSelf: "flex-end",
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        marginBottom: "10px",
                                        border: "none",
                                        textTransform: "none",
                                    }}


                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                //MAKE DELETE REQUEST
                                                fetch(`http://localhost:8081/api/v1/students-follow-courses/delete/${student.idStudentFollowCourse}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                                                        "Access-Control-Allow-Origin": "*",
                                                    },
                                                })
                                                    .then(response => {
                                                        if (!response.ok) {
                                                            console.error(`Server responded with status code ${response.status}`);
                                                            throw new Error('Failed to delete student');
                                                        }
                                                        if (response.headers.get('content-type')?.includes('application/json')) {
                                                            const data = response.json();
                                                            console.log('File uploaded', data);
                                                        } else {
                                                            console.log('No JSON data returned');
                                                        }
                                                    })
                                                    .then(data => {
                                                        console.log(data);
                                                        Swal.fire({
                                                            title: "Deleted!",
                                                            text: "The account has been deleted.",
                                                            icon: "success"
                                                        });

                                                        navigate("/main-page-admin")
                                                    })
                                                    .catch(error => {
                                                        console.error('An error occured!', error);

                                                    });
                                            }
                                        });

                                    }}
                                >
                                </Button>


                            </CardContent>
                        </Box>
                    </CardElongated>
                    )))}
            </div>
        </div>
    );
}


export default SeeStudentsPerCourseAdmin;