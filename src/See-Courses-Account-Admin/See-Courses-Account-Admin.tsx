import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';
import {useState} from "react";
import {Course} from "../types";

function SeeCoursesAccountAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const location = useLocation();
    const course = location.state.course;

    const [editedCourse, setEditedCourse] = useState<Course>(course);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        let key = id;
        switch(id) {
            case 'outlined-start-adornment-coursename':
                key = 'name';
                break;
            case 'outlined-number':
                key = 'year';
                break;
            case 'outlined-number-semester':
                key = 'semester';
                break;
            case 'outlined-number-credits':
                key = 'credits';
                break;
            case 'fullWidth-description':
                key = 'description';
                break;
            default:
                break;
        }
        setEditedCourse(prevState => ({
            ...prevState,
            [key]: id === 'outlined-number' || id === 'outlined-number-semester' || id === 'outlined-number-credits' ? parseInt(value) : value
        }));
    };

    const handleSaveClick = () => {
        // fetch(`http://localhost:8081/api/v1/courses/update/${editedCourse.idCourses}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(editedCourse),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // Handle the response data here
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        fetch(`http://localhost:8081/api/v1/courses/update/${editedCourse.idCourses}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCourse),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();  // Change this line
            })
            .then(text => {
                console.log('Server response:', text);
                return text ? JSON.parse(text) : {};  // Add a check here
            })
            .then(data => {
                // Handle the response data here
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
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
                    onChange={handleInputChange}
                />


                <TextField
                    id="outlined-number"
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />

                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Description"
                    id="fullWidth-description"
                    InputLabelProps={{ shrink: true }}
                    value={editedCourse.description}
                    onChange={handleInputChange}
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
                    <Button variant="outlined">Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The details have been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            handleSaveClick();
                        }}
                    >
                        Save
                    </Button>
                </Box>

            </Card>

        </div>
    );
}

export default SeeCoursesAccountAdmin;