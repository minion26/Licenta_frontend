import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import styles from "./Homeworks-Per-Lecture-Teacher.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course, HomeworkAnnouncements} from "../types.ts";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";

function HomeworksPerLectureTeacher() {
    const {idCourses, idLectures} = useParams();
    const [homeworks, setHomeworks] = useState<HomeworkAnnouncements[]>([]);

    const [course, setCourse] = useState<Course>();



    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setCourse(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('An error occured!', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, [idCourses]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework-announcements/idLecture=${idLectures}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setHomeworks(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('An error occured!', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, [idLectures]);


    // useEffect(() => {
    //     fetch(`localhost:8081/api/v1/homework/all/idHomeworkAnnouncement=`, {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => console.error('An error occured!', error));
    // }, []);

    return (
        <div>
            <Header />
            <UpperHeader title={course ? course?.name : ""} subtitle="Homeworks" />
            <div className={styles.container}>
                {homeworks.length > 0 ? homeworks.map((homework, index) => {
                    return (
                        <CardElongated key={index} title={homework.title} cardIndex={index}>
                            <Button
                                variant="contained"
                                endIcon={<CreateOutlinedIcon/>}
                                sx={{
                                    width: isSmallScreen ? '150px' : '200px',
                                    height: '50px',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '20px',
                                    color: 'rgba(0,0,0,0.75)',
                                    fontFamily: 'Inter',
                                    fontSize: isSmallScreen ? '10px' : '12px',
                                    fontWeight: 'semi-bold',
                                    alignSelf: 'flex-end',
                                    marginTop: 'auto',
                                    marginLeft: '60%',
                                    marginRight: '20px',
                                    marginBottom: '50px',
                                    border: 'none',
                                    textTransform: 'none',
                                }}
                                component={Link}
                                to={`/see-submissions/${homework.idHomeworkAnnouncement}`}
                            > See submissions
                            </Button>

                        </CardElongated>
                    );
                }) : <Card
                    sx={{
                        // marginLeft: isSmallScreen ? "0px" : "200px",
                        marginTop: "10px",
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
                            No homeworks for this lecture! <br/>
                        </p>
                    </div>
                </Card>
                }

            </div>
        </div>
    );
}

export default HomeworksPerLectureTeacher;