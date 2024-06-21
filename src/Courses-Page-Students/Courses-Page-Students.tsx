import styles from './Courses-Page-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link, useParams} from "react-router-dom";
import {Course, User} from "../types.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

function CoursesPageStudents(){
    const {semesterNumber } = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (typeof semesterNumber === "string") {
        localStorage.setItem('semesterNumber', semesterNumber);
    }
    if (semesterNumber === undefined) {
        throw new Error("semesterNumber is undefined");
    }
    const semesterNumberInt = parseInt(semesterNumber);


    const [courses, setCourses] = useState<Course[]>([]);
    const [, setUser] = useState<User>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/v1/username', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const data = await response.json();
                console.log("email: " + data.username);

                const userResponse = await fetch(`http://localhost:8081/api/v1/users/email/${data.username}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const userData = await userResponse.json();
                console.log(userData);
                setUser(userData);
                console.log("user: " + userData.idUsers)

                const coursesResponse = await fetch(`http://localhost:8081/api/v1/courses/get-courses-for-student/idStudent=${userData.idUsers}/semester=${semesterNumberInt}`, {
                    method:"GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                });

                if(!coursesResponse.ok){
                    const err = await coursesResponse.json();
                    throw new Error(err.message);
                }

                if (coursesResponse.ok && coursesResponse.headers.get("content-type")?.includes("application/json")) {
                    const text = await coursesResponse.text();
                    if (text) {
                        const coursesData = JSON.parse(text);
                        setCourses(coursesData);
                    } else {
                        console.error('Error: Empty response');
                    }
                }
            } catch (err) {
                console.log("error: ", err);
                Swal.fire({
                    icon: 'error',
                    title: (err as Error).message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <UpperHeader title="Courses" subtitle="date"  />
            <div className={styles.cardContainer}>

                {
                   courses.length > 0 ? courses.map((course, index) => {
                        return (
                            <Link key={index} to={`/lecture-per-course/${course.idCourses}`} className={styles.noDecoration}>
                                <CardLarge title={course.name} credits={course.credits} description={course.description} cardIndex={index}/>
                            </Link>
                        );
                    }  ) : <Card
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
                               You are not enrolled in any courses for the semester {semesterNumberInt} ! <br/>
                           </p>
                       </div>
                   </Card>
                }

                {/*<Link to={"/lecture-per-course"} className={styles.noDecoration}>*/}
                {/*    <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1}/>*/}
                {/*</Link>*/}

                {/*<CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={2}/>*/}
                {/*<CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={3}/>*/}
                {/*<CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={4}/>*/}
                {/*<CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={5}/>*/}
                {/*<CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1}/>*/}
            </div>
        </div>
    );
}

export default CoursesPageStudents;