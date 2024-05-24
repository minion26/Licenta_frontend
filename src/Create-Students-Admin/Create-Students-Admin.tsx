import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./Create-Students-Admin.module.css";


function CreateStudentsAdmin(){
    const navigate = useNavigate();


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        facultyEmail: "",
        personalEmail: "",
        nrMatriculation: "",
        yearOfStudy: "",
        semester: "",
        groupOfStudy: ""
    });

    const initialStudentState = {
        firstName: "",
        lastName: "",
        facultyEmail: "",
        personalEmail: "",
        nrMatriculation: "",
        yearOfStudy: "",
        semester: "",
        groupOfStudy: ""
    };

    const handleCancel = () => {
        setStudent(initialStudentState);
    };

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setStudent({
            ...student,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(student);

        const response = await fetch("http://localhost:8081/api/v1/students/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",

            },
            body: JSON.stringify(student),
        });


        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The account has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            navigate("/main-page-admin");
        } else {
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
            <Header />
            <UpperHeader title={"Create accounts"} subtitle={"Students"}/>
            <Box
                sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: isSmallScreen ? "0px" : "125px",
                    marginTop: "20px",
                    width: "75%",
                }}

            >
            <Box>
                <TextField
                    label="First Name"
                    id="outlined-start-adornment-firstname"
                    name="firstName"
                    value = {student.firstName}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment-lastname"
                    name="lastName"
                    value = {student.lastName}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                />

                <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
                    fullWidth
                    label="Faculty Email"
                    id="faculty-email"
                    name={"facultyEmail"}
                    value = {student.facultyEmail}
                    onChange={handleChange}
                />

                <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
                    fullWidth
                    label="Personal Email"
                    id="personal-email"
                    name={"personalEmail"}
                    value = {student.personalEmail}
                    onChange={handleChange}
                />


                <TextField
                    label="Number Matricol"
                    id="outlined-start-adornment-nr-matricol"
                    name={"nrMatriculation"}
                    value = {student.nrMatriculation}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                />

                <TextField
                    id="outlined-number"
                    label="Year of study"
                    type="number"
                    name={"yearOfStudy"}
                    value = {student.yearOfStudy}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 3,
                    }}
                />

                <TextField
                    id="outlined-number-semester"
                    label="Semester"
                    type="number"
                    name={"semester"}
                    value = {student.semester}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 2,
                    }}
                />

                <TextField
                    label="Group"
                    id="outlined-start-adornment-group"
                    name={"groupOfStudy"}
                    value = {student.groupOfStudy}
                    onChange={handleChange}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
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
                        // variant="contained"
                        // onClick={() => {
                        //     Swal.fire({
                        //         position: "top-end",
                        //         icon: "success",
                        //         title: "The account has been saved",
                        //         showConfirmButton: false,
                        //         timer: 1500
                        //     });
                        // }}
                        variant="contained"
                        type="submit"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
            </Box>
        </form>
    );
}

export default CreateStudentsAdmin;