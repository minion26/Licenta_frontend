import styles from "./See-Courses-Admin.module.css";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Course} from "../types";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from "@mui/material/Tooltip";

function SeeCoursesAdmin(){
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        fetch('http://localhost:8081/api/v1/courses', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

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
            <Header/>
            <UpperHeader
                title={"See Details"}
                subtitle={"Courses"}
                buttons={[{ key: "Search", label: "Search" }]}
                onSearch={handleSearch}
            />
            <div className={styles.cardContainer}>
                {filteredCourses.map((course, index) => (
                <CardElongated title={course.name} cardIndex={index} height={100} key={index}>
                    <Box sx={{ display: "flex" }}>
                        <CardContent
                            sx={{
                                flex: "1 0 auto",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Tooltip title={"Delete this course"}>
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
                                           fetch(`http://localhost:8081/api/v1/courses/delete/${course.idCourses}`, {
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
                                                   return response.json();
                                               })
                                               .then(data => {
                                                    console.log(data);
                                                   Swal.fire({
                                                       title: "Deleted!",
                                                       text: "The course has been deleted.",
                                                       icon: "success"
                                                   });
                                                    navigate("/main-page-admin");
                                               })
                                               .catch((error) => {
                                                   console.error('Error:', error);
                                               });
                                        }
                                    });
                                }}

                            >
                            </Button>
                            </Tooltip>
                            <Tooltip title={"Edit this course"}>
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
                                to={`/see-course-account/${course.idCourses}`}
                            >
                            </Button>
                            </Tooltip>

                            <Tooltip title={"See teachers"}>
                            <Button
                                variant="contained"
                                endIcon={<RemoveRedEyeIcon />}
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
                                to={`/teachers-per-course/${course.idCourses}`}
                            >
                            </Button>
                            </Tooltip>

                            <Tooltip title={"See students"}>
                            <Button
                                variant="contained"
                                endIcon={<RemoveRedEyeIcon />}
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
                                to={`/students-per-course/${course.idCourses}`}
                            >
                            </Button>
                            </Tooltip>
                        </CardContent>
                    </Box>
                </CardElongated>
                    ))}
            </div>


        </div>
    );
}

export default SeeCoursesAdmin;