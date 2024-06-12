import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course,  HomeworkAnnouncements} from "../types.ts";
import styles from "../See-Homework-Announcemet-Teacher/See-Homework-Announcemet-Teacher.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";


function Buttons({idCourses,idHomeworkAnnouncement}: {idCourses: string | undefined ,idHomeworkAnnouncement: string}){
    return (<div>

            <Tooltip title={"See the homework and add a solution"}>
            <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
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
                to={`/see-homework-details/${idCourses}/${idHomeworkAnnouncement}`}
            >
            </Button>
            </Tooltip>

        </div>
    );
}



function SeeHomeworkAnnouncementStudent() {
    const {idCourses, idLecture} = useParams();
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

        fetch(`http://localhost:8081/api/v1/homework-announcements/idLecture=${idLecture}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message);
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
    }, [idCourses, idLecture]);




    return (
        <div>
            <Header />
            <UpperHeader title={"Homework" } subtitle={course ? course.name : ""}/>
            <div className={styles.cardContainer}>
                { homeworks.length === 0 ? <h1>No homeworks available</h1> :
                    homeworks.map((homework, index) => {
                        return (
                            <CardElongated title={homework.title} cardIndex={index} height={145}>
                                <Box sx={{ display: "flex" }}>
                                    <CardContent
                                        sx={{
                                            flex: "1 0 auto",
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Buttons idCourses={idCourses} idHomeworkAnnouncement={homework.idHomeworkAnnouncement} />
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

export default SeeHomeworkAnnouncementStudent;