import styles from './Materials-Per-Lecture-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Lecture} from "../types.ts";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function Buttons({idLectures, idCourses}: {idLectures: string | undefined, idCourses: string | undefined}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return ( <div>
            <Card sx={{ display: 'flex',
                width: isSmallScreen ? '100%' : '250px',
                height: isSmallScreen ? '50%' : '220px',
                backgroundColor: "#FAFAF5",
                borderRadius: '24px',
                alignSelf: 'center',
                flexDirection: 'center',
                justifyContent: 'center', // Centrare pe axa orizontală
                alignItems: 'center' // Centrare pe axa verticală

            }}>
                <Box sx={{
                    display: 'flex',
                    // flexWrap:'wrap'
                    justifyContent: 'center', // Centrare pe axa orizontală
                    alignItems: 'center' // Centrare pe axa verticală
                }}
                >
                    <CardContent sx={{ flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'center',
                        justifyContent: 'center', // Centrare pe axa orizontală
                        alignItems: 'center' // Centrare pe axa verticală
                    }}>

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
                            to={`/see-homework-announcement/${idCourses}/${idLectures}`}
                        > See Homework
                        </Button>

                    </CardContent>
                </Box>
            </Card>

        </div>
    );
}

function MaterialsPerLectureStudents() {
    const {idCourses, idLecture} = useParams();
    const [materialType, setMaterialType] = useState<string[]>([]);
    const [lecture, setLecture] = useState<Lecture>();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8081/api/v1/lectures/${idLecture}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },

            });
            if(!response.ok){
                const errorData = await response.json();
                setHasError(true);
                await Swal.fire({
                    icon: 'error',
                    title: errorData.message || 'An error occurred',
                    showConfirmButton: false,
                    timer: 1500
                });

            }else{
                const data = await response.json();
                setLecture(data);

            }


        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`http://localhost:8081/api/v1/materials/get-type/idLecture=${idLecture}`, {
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

    return(
        <div>
            <Header />
            <UpperHeader title={lecture ? lecture.name : "" } subtitle={lecture ? lecture.description : ""}/>
            <div className={styles.container}>

                {
                   !hasError && materialType.includes("course") &&
                    <Link to={`/view-course/${idCourses}/${idLecture}/course`} className={styles.noDecoration}>
                        <CardLarge title="Course Materials" cardIndex={1} />
                    </Link>
                }

                {
                    !hasError && materialType.includes("auxiliar") &&
                    <Link to={`/view-course/${idCourses}/${idLecture}/auxiliar`} className={styles.noDecoration}>
                        <CardLarge title="Auxiliar" cardIndex={3} />
                    </Link>
                }

                {
                    !hasError && materialType.includes("video") &&
                    <Link to={`/view-course/${idCourses}/${idLecture}/video`} className={styles.noDecoration}>
                        <CardLarge title="Video" cardIndex={2} />
                    </Link>
                }

                {
                    !hasError && <Buttons idLectures={idLecture} idCourses={idCourses}/>
                }

            </div>
        </div>
    );
}

export default MaterialsPerLectureStudents;