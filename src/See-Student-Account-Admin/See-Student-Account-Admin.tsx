import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Student} from "../types";

function SeeStudentAccountAdmin(){
    const navigate = useNavigate();
    const {idUsers} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [student, setStudent] = useState<Student>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        nrMatriculation: '',
        yearOfStudy: 0,
        semester: 0,
        groupOfStudy: '',
    });
    const [studentBackup, setStudentBackup] = useState<Student>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        nrMatriculation: '',
        yearOfStudy: 0,
        semester: 0,
        groupOfStudy: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/students/${idUsers}`, {
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
                    setStudent(data);
                    setStudentBackup(data);
                    console.log(data);
            })
            .catch(error => console.error('An error occured!', error));

    }, [idUsers]);

    function handleInputChange(property: keyof Student, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setStudent((prevStudent) => ({
            idUsers: prevStudent?.idUsers || '',
            firstName: prevStudent?.firstName || '',
            lastName: prevStudent?.lastName || '',
            facultyEmail: prevStudent?.facultyEmail || '',
            personalEmail: prevStudent?.personalEmail || '',
            nrMatriculation: prevStudent?.nrMatriculation || '',
            yearOfStudy: prevStudent?.yearOfStudy || 0,
            semester: prevStudent?.semester || 0,
            groupOfStudy: prevStudent?.groupOfStudy || '',
            [property]: newValue,
        }));
    }

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(student);

        const response = await fetch(`http://localhost:8081/api/v1/students/update/${idUsers}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json",
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",

            },
            body: JSON.stringify(student),
        });


        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The details have been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            navigate("/see-students-admin");
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

    function handleCancel() {
        setStudent(studentBackup);
    }



    return (
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={"See account"} subtitle={student ? student.firstName + " " + student.lastName : ""}/>
            <Card
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: isSmallScreen ? "0px" : "200px",
                    marginTop: "20px",
                    width: "75%",
                }}
            >
                <TextField
                    label="First Name"
                    id="outlined-start-adornment-firstname"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={student?.firstName}
                    name={"firstName"}
                    onChange={(event) => handleInputChange("firstName", event)}

                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment-lastname"
                    sx={{ m: 1,width: "25ch" , marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={student?.lastName}
                    name={"lastName"}
                    onChange={(event) => handleInputChange("lastName", event)}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Faculty Email"
                    id="fullWidth-faculty-email"
                    InputLabelProps={{ shrink: true }}
                    value={student?.facultyEmail}
                    name={"facultyEmail"}
                    onChange={(event) => handleInputChange("facultyEmail", event)}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Personal Email"
                    id="fullWidth-personal-email"
                    InputLabelProps={{ shrink: true }}
                    value={student?.personalEmail}
                    name={"personalEmail"}
                    onChange={(event) => handleInputChange("personalEmail", event)}
                />

                <TextField
                    label="Number Matricol"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={student?.nrMatriculation}
                    name={"nrMatriculation"}
                    onChange={(event) => handleInputChange("nrMatriculation", event)}
                />

                <TextField
                    id="outlined-number"
                    label="Year of study"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 3,
                    }}
                    value={student?.yearOfStudy}
                    name={"yearOfStudy"}
                    onChange={(event) => handleInputChange("yearOfStudy", event)}
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
                    value={student?.semester}
                    name={"semester"}
                    onChange={(event) => handleInputChange("semester", event)}
                />

                <TextField
                    label="Group"
                    id="outlined-start-adornment-group"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={student?.groupOfStudy}
                    name={"groupOfStudy"}
                    onChange={(event) => handleInputChange("groupOfStudy", event)}
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
                        type="submit"

                    >
                        Save
                    </Button>
                </Box>

            </Card>

        </form>
    );
}

export default SeeStudentAccountAdmin;