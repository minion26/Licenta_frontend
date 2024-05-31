import styles from "./Materials-Per-Course-Teacher.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Link, useParams} from "react-router-dom";
import { Lecture} from "../types.ts";
import {useEffect, useState} from "react";


function Buttons(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

   return ( <Card sx={{ display: 'flex',
        width: isSmallScreen ? '100%' : '250px',
        height: isSmallScreen ? '50%' : '200px',
        backgroundColor: "#FAFAF5",
        borderRadius: '24px',
           alignSelf: 'center',

        }}>
            <Box sx={{ display: 'flex', }}>
                <CardContent sx={{ flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/add-materials-per-lecture"
                    > Add Materials
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/add-homework-announcement"
                    > Add Homework
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/see-homework-announcement"
                    > Edit Homework
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<RemoveRedEyeOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/homeworks-per-lecture"
                    > See Homework
                    </Button>
                </CardContent>
            </Box>
        </Card>
   );
}


function MaterialsPerCourseTeacher() {
    const {idCourses, idLectures} = useParams();
    const [lecture, setLecture] = useState<Lecture>();
    // const [course, setCourse] = useState<Course>();
    const [materialType, setMaterialType] = useState<string[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8081/api/v1/lectures/${idLectures}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },

            });
            const data = await response.json();
            setLecture(data);
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //
    //         });
    //         const data = await response.json();
    //         setCourse(data);
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`http://localhost:8081/api/v1/materials/get-type/idLecture=${idLectures}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const data = await response.json();
                console.log("material type: " , data);
                setMaterialType(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, []);


    return (
    <div>
        <Header />
        <UpperHeader title={lecture ? lecture.name : ""} subtitle={lecture ? lecture.description : ""}/>
        <div className={styles.container}>

            {
               materialType.includes("course") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/course`} className={styles.noDecoration}>
                    <CardLarge title="Course Materials" cardIndex={1} />
                </Link>
            }

            {
                materialType.includes("auxiliar") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/auxiliar`} className={styles.noDecoration}>
                    <CardLarge title="Auxiliar" cardIndex={3} />
                </Link>
            }

            {
                materialType.includes("video") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/video`} className={styles.noDecoration}>
                    <CardLarge title="Video" cardIndex={2} />
                </Link>
            }

            <Buttons />


        </div>
    </div>
  );
}

export default MaterialsPerCourseTeacher;