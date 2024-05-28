import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course, TeacherDidactic} from "../types.ts";
import styles from "./See-Teachers-Per-Course-Admin.module.css";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import AddIcon from '@mui/icons-material/Add';

interface ButtonsProps {
    idCourses: string | undefined;
}

function Buttons({ idCourses }: ButtonsProps){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return ( <Card sx={{ display: 'flex',
            width: isSmallScreen ? '100%' : '250px',
            height: isSmallScreen ? '50%' : '150px',
            backgroundColor: "#FAFAF5",
            borderRadius: '24px',
            alignSelf: 'center',
            justifyContent: 'center',

        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        sx={{
                            width: '200px',
                            height: '60px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to={`/add-single-teacher-per-course/${idCourses}`}
                    > Add teacher to this course
                    </Button>

                </CardContent>
            </Box>
        </Card>
    );
}

function SeeTeachersPerCourseAdmin(){
    const {idCourses} = useParams();
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState<TeacherDidactic[]>([]);
    const[course, setCourse] = useState<Course>();


    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: "GET",
            credentials: 'include',
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
            .catch(error => console.error('An error occured!', error));

        fetch(`http://localhost:8081/api/v1/didactic/${idCourses}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTeachers(data);
                console.log(data);
            })
            .catch(error => console.error('An error occured!', error));
    }, []);

    return (
        <div>
            <Header/>
            <UpperHeader title={"See teachers"} subtitle={course?.name || ""}/>
            <div className={styles.cardContainer}>
                {teachers.map(
                    (teacher, index) => (
                        <CardElongated key={index} title={`${teacher.teacherName} `} cardIndex={index} height={100}>
                            <Box sx={{ display: "flex" }}>
                                <CardContent
                                    sx={{
                                        flex: "1 0 auto",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
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
                                                    fetch(`http://localhost:8081/api/v1/didactic/delete/${teacher.idDidactic}`, {
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
                    )
                )}
                <Buttons idCourses={idCourses} />
            </div>

        </div>
    );
}

export default SeeTeachersPerCourseAdmin;