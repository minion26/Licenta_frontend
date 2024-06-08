import styles from './Courses-Page-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link, useParams} from "react-router-dom";
import {Course, User} from "../types.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

function CoursesPageStudents(){
    const {semesterNumber } = useParams();
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
                    }  ) : <h1>No courses available</h1>
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