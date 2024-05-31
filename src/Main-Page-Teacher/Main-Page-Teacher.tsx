import Header from "../Header-teacher/Header.tsx";
import styles from './Main-Page-Teacher.module.css';
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Course, User} from "../types.ts";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";




function MainPageTeacher() {
    const [courses, setCourses] = useState<Course[]>([]);

    const [user, setUser] = useState<User>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        password: '',
        role: '',

    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                // setUsername(data.username);

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
                console.log("user: " + user.idUsers)

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user.idUsers) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/api/v1/courses/idTeacher=${user.idUsers}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setCourses(data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchData();
        }
    }, [user.idUsers]);

    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (searchValue: string) => {
        setSearchInput(searchValue);
    };

    const filteredCourses = searchInput
        ? courses.filter(course =>
            course.name.toLowerCase().startsWith(searchInput.toLowerCase())
        )
        : courses;

  return (
    <div>
      <Header />
        <UpperHeader
            title="Courses"
            subtitle="date"
            buttons={[{ key: "Search", label: "Search" }]}
            onSearch={handleSearch}

        />
        <div className={styles.cardContainer}>
            { filteredCourses.length === 0 ? (<Card
                    sx={{
                        // marginLeft: isSmallScreen ? "0px" : "200px",
                        // marginTop: "10px",
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
                            No courses found for you.
                        </p>
                        <p className={styles.p}>Please enroll.</p>
                    </div>
                </Card>) :
                (filteredCourses.map((course, index) => (
                <Link key={index} to={`/lecture-per-course/${course.idCourses}`} className={styles.noDecoration}>
                    <CardLarge  title={course.name} credits={course.credits} description={course.description} cardIndex={index}/>
                </Link>
            )))}



        </div>


    </div>
  );
}

export default MainPageTeacher;