import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import {Course} from "../types";
import {useNavigate, useParams} from "react-router-dom";


function SeeCoursesAccountAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const {idCourses} = useParams();


    const [editedCourse, setEditedCourse] = useState<Course>({
        idCourses: '',
        name: '',
        year: 0,
        semester: 0,
        credits: 0,
        description: ''
    });

    const [editedCourseBackup, setEditedCourseBackup] = useState<Course>({
        idCourses: '',
        name: '',
        year: 0,
        semester: 0,
        credits: 0,
        description: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                    setEditedCourse(data);
                    setEditedCourseBackup(data);
                    console.log(data);
            })
            .catch(error => console.error('An error occured!', error));
        }, [idCourses]
    );

    function handleInputChange(property : keyof Course, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
        const newValue = event.target.value;
        setEditedCourse({
            ...editedCourse,
            [property]: newValue
        });
    }

    function handleCancel(){
        setEditedCourse(editedCourseBackup);
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(editedCourse);

        const response = await fetch (`http://localhost:8081/api/v1/courses/update/${idCourses}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(editedCourse)
        });

        if (response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The course has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            navigate("/main-page-admin");
        }else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={"See Course"} subtitle={"Machine "}/>
            <Card
                sx={{


                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: isSmallScreen ? "0px" : "200px",
                    marginTop: "20px",
                    width: "75%",
                }}
            >
                <TextField
                    label="Course Name"
                    id="outlined-start-adornment-coursename"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={editedCourse.name}
                    name={"name"}
                    onChange={(event) => handleInputChange("name", event)}
                />


                <TextField
                    id="outlined-number-year"
                    label="Year"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 3,
                    }}
                    value={editedCourse.year}
                    name={"year"}
                    onChange={(event) => handleInputChange("year", event)}
                />

                <TextField
                    id="outlined-number-semester"
                    label="Semester"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 2,
                    }}
                    value={editedCourse.semester}
                    name={"semester"}
                    onChange={(event) => handleInputChange("semester", event)}
                />

                <TextField
                    id="outlined-number-credits"
                    label="Credits"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 7,
                    }}
                    value={editedCourse.credits}
                    name={"credits"}
                    onChange={(event) => handleInputChange("credits", event)}
                />

                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Description"
                    id="fullWidth-description"
                    InputLabelProps={{ shrink: true }}
                    value={editedCourse.description}
                    name={"description"}
                    onChange={(event) => handleInputChange("description", event)}
                />



                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "20px",
                        m: 1,
                    }}
                >
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button
                        variant="contained"
                        type={"submit"}
                    >
                        Save
                    </Button>
                </Box>

            </Card>

        </form>
    );
}

export default SeeCoursesAccountAdmin;