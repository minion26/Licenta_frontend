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
import { useNavigate } from 'react-router-dom';
import {Course} from "../types";

function SeeCoursesAdmin(){
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8081/api/v1/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    const handleEditClick = (course: Course) => {
        navigate("/see-course-account", { state: { course: course } });
    };

    return (
        <div>
            <Header/>
            <UpperHeader title={"See Details"} subtitle={"Courses"} buttons={[{ key: "Search", label: "Search" }]}/>
            <div className={styles.cardContainer}>
                {courses.map((course, index) => (
                <CardElongated title={course.name} cardIndex={index} height={100} key={index}>
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
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "The course has been deleted.",
                                                icon: "success"
                                            });
                                            // Here you can add the code to actually delete the student
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
                                onClick={() => handleEditClick(course)}
                            >

                                {/*<Link*/}
                                {/*    to={{*/}
                                {/*        pathname: "/see-course-account",*/}
                                {/*        state: { course: course }*/}
                                {/*    }}*/}
                                {/*>*/}

                                {/*</Link>*/}
                            </Button>
                        </CardContent>
                    </Box>
                </CardElongated>
                    ))}
            </div>


        </div>
    );
}

export default SeeCoursesAdmin;