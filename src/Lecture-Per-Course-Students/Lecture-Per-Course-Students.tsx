import styles from "./Lecture-Per-Course-Students.module.css";
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course, Lecture} from "../types.ts";
import Swal from "sweetalert2";

function LecturePerCourseStudents() {
    const {idCourses} = useParams();
    if (typeof idCourses === "string") {
        localStorage.setItem('lastVisitedIdCourses', idCourses);
    }
    const [course, setCourse] = useState<Course>({
        name: '',
        idCourses: '',
        description: '',
        year: 0,
        semester: 0,
        credits: 0,
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method:"GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message);
                    })
                }
                return response.json();
            })
            .then(data => {
                setCourse(data);

            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, []);

    const [lectures, setLectures] = useState<Lecture[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/lectures/idCourses=${idCourses}`, {
            method:"GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message);
                    })
                }
                return response.json();
            })
            .then(data => {
                setLectures(data);

            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                })
            });
    }, [idCourses]);

    useEffect(() => {
        console.log(lectures);
    }, []);

    return (
    <div>
        <Header />
        <UpperHeader title={course.name} subtitle={course.description}/>
        <div className={styles.container}>
            {
                lectures.map((lecture, index) => {
                    return (
                        <CardElongated key={index} title={lecture.name} description={lecture.description} cardIndex={index}>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardRoundedIcon />}
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '20px',
                                    color: '#000000',
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                    marginLeft: '75%',
                                    marginRight: '20px',
                                    marginBottom: '50px',
                                    border: 'none',
                                }}
                                component={Link}
                                to={`/materials-per-lecture/${idCourses}/${lecture.idLecture}`}
                            >
                            </Button>
                        </CardElongated>
                    );
                })
            }

            {/*<CardElongated title="Lecture 1" description="bla bla" cardIndex={1}>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        endIcon={<ArrowForwardRoundedIcon />}*/}
            {/*        sx={{*/}
            {/*            width: '50px',*/}
            {/*            height: '50px',*/}
            {/*            backgroundColor: '#F5F5F5',*/}
            {/*            borderRadius: '20px',*/}
            {/*            color: '#000000',*/}
            {/*            fontWeight: 'bold',*/}
            {/*            alignSelf: 'flex-end',*/}
            {/*            marginLeft: '75%',*/}
            {/*            marginRight: '20px',*/}
            {/*            marginBottom: '50px',*/}
            {/*            border: 'none',*/}
            {/*        }}*/}
            {/*        component={Link}*/}
            {/*        to="/materials-per-lecture"*/}
            {/*    >*/}
            {/*    </Button>*/}
            {/*</CardElongated>*/}
            {/*<CardElongated title="Lecture 2" description="bla bla" cardIndex={2}>*/}
            {/*    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{*/}
            {/*        width: '50px',*/}
            {/*        height: '50px',*/}
            {/*        backgroundColor: '#F5F5F5',*/}
            {/*        borderRadius: '20px',*/}
            {/*        color: '#000000',*/}
            {/*        fontWeight: 'bold',*/}
            {/*        alignSelf: 'flex-end',*/}
            {/*        marginLeft: '75%',*/}
            {/*        marginRight: '20px',*/}
            {/*        marginBottom: '50px',*/}
            {/*        border: 'none',*/}

            {/*    }}>*/}
            {/*    </Button>*/}
            {/*</CardElongated>*/}
        </div>
    </div>
  );
}

export default LecturePerCourseStudents;