import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "../See-Homework-Announcemet-Teacher/See-Homework-Announcemet-Teacher.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course, HomeworkAnnouncements} from "../types.ts";

function Buttons({idHomeworkAnnouncement}: {idHomeworkAnnouncement: string}){
    return (<div>
        <Button
            variant="contained"
            endIcon={<DeleteIcon />}
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
            // component={Link}
            // to="/homeworks-per-lecture"

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
                        fetch(`http://localhost:8081/api/v1/homework-announcements/delete/idHomeworkAnnouncement=${idHomeworkAnnouncement}`, {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
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

                                window.location.reload();
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                                Swal.fire({
                                    title: "An error occurred",
                                    text: "The announcement could not be deleted.",
                                    icon: "error"
                                });

                            })
                    }
                });
            }}

        >
        </Button>
        <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
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
            component={Link}
            to={`/edit-homework-announcement/${idHomeworkAnnouncement}`}
        >
        </Button>
    </div>
    );
}

function SeeHomeworkAnnouncementTeacher() {
    const {idCourses, idLectures} = useParams();
    const [course, setCourse] = useState<Course>();
    const [homeworks, setHomeworks] = useState<HomeworkAnnouncements[]>([]);

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


  return (
    <div>
        <Header/>
        <UpperHeader title={"Homework " + course?.name} subtitle={"date"}/>
        <div className={styles.cardContainer} key={1}>
            {
                homeworks.map((homework, index) => {
                    return (
                        <CardElongated key={index} title={homework.title} cardIndex={index} height={145}>
                            <Box sx={{ display: "flex" }}>
                                <CardContent
                                    sx={{
                                        flex: "1 0 auto",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Buttons idHomeworkAnnouncement={homework.idHomeworkAnnouncement}/>
                                </CardContent>
                            </Box>
                        </CardElongated>
                    );
                })
            }

    </div>
    </div>
  );
}

export default SeeHomeworkAnnouncementTeacher;