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
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
                console.log(data);
            })
            .catch((error) => console.error('An error occured!', error));
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
            .then((response) => response.json())
            .then((data) => {
                setHomeworks(data);
                console.log(data);
            })
            .catch((error) => console.error('An error occured!', error));
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
                {homeworks.map((homework, index) => {
                    return (
                        <CardElongated title={homework.title} cardIndex={index} >
                            <Button
                                variant="contained"
                                endIcon={<CreateOutlinedIcon />}
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
                                    marginLeft: 'auto',
                                    marginRight: '20px',
                                    marginBottom: '50px',
                                    border: 'none',
                                    textTransform: 'none',
                                }}
                                component={Link}
                                to={`lalal/${homework.idHomeworkAnnouncement}/submissions`}
                            > See submissions
                            </Button>
                        </CardElongated>
                    );
                })}

            </div>
        </div>
    );
}

export default HomeworksPerLectureTeacher;