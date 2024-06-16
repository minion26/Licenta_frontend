import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function CreateTeachersAdmin() {
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [teacher, setTeacher] = useState({
        firstName: "",
        lastName: "",
        facultyEmail: "",
        personalEmail: "",
        idTeacher: "",
        degree: ""
    });

    const initialTeacherState = {
        firstName: "",
        lastName: "",
        facultyEmail: "",
        personalEmail: "",
        idTeacher: "",
        degree: ""
    };

    const handleCancel = () => {
        setTeacher(initialTeacherState);
    }

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setTeacher({
            ...teacher,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        for (const key in teacher) {
            if (teacher[key as keyof typeof teacher] === "") {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Please fill all fields",
                    showConfirmButton: false,
                    timer: 1500
                });
                return; // Prevent form submission
            }
        }

        console.log(teacher);

        const response = await fetch("http://localhost:8081/api/v1/teachers/create", {
            method: "POST",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(teacher),
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
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Header />
            <UpperHeader title={"Create accounts"} subtitle={"Teachers"}/>
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
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={teacher.firstName}
                        name="firstName"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-start-adornment-lastname"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={teacher.lastName}
                        name="lastName"
                        onChange={handleChange}
                    />

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Faculty Email"
                        id="fullWidth"
                        value={teacher.facultyEmail}
                        name="facultyEmail"
                        onChange={handleChange}
                    />

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Personal Email"
                        id="fullWidth"
                        value={teacher.personalEmail}
                        name={"personalEmail"}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Id Teacher"
                        id="outlined-start-adornment-id-teacher"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={teacher.idTeacher}
                        name="idTeacher"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Degree"
                        id="outlined-start-adornment-degree"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={teacher.degree}
                        name="degree"
                        onChange={handleChange}
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
                </Box>
            </Box>
        </form>
    );
}

export default CreateTeachersAdmin;