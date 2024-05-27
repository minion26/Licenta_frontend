
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
import {Teacher} from "../types.ts";
import {useEffect, useState} from "react";

function SeeTeacherAccountAdmin(){
    const {idUsers} = useParams();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [teacher, setTeacher] = useState<Teacher>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        idTeacher: '',
        degree: '',
    });

    const [teacherBackup, setTeacherBackup] = useState<Teacher>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        idTeacher: '',
        degree: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/teachers/${idUsers}`, {
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
                setTeacher(data);
                setTeacherBackup(data);
                console.log(data);
            })
            .catch(error => console.error('An error occured!', error));

    }, [idUsers]);

    function handleInputChange( property: keyof Teacher, event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const newValue = event.target.value;
        setTeacher( (prevTeacher) => ({
            idUsers: prevTeacher?.idUsers || '',
            firstName: prevTeacher?.firstName || '',
            lastName: prevTeacher?.lastName || '',
            facultyEmail: prevTeacher?.facultyEmail || '',
            personalEmail: prevTeacher?.personalEmail || '',
            idTeacher: prevTeacher?.idTeacher || '',
            degree: prevTeacher?.degree || '',
            [property]: newValue,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(teacher);

        const response = await fetch(`http://localhost:8081/api/v1/teachers/update/${idUsers}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(teacher),
        });

            if (response.ok){
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

                navigate("/see-teachers-admin");
            }else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error has occurred",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
    };

    function handleCancel(){
        setTeacher(teacherBackup);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={"See account"} subtitle={teacher ? teacher.firstName + " " + teacher.lastName : ""}/>
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
                    value={teacher.firstName}
                    name={"firstName"}
                    onChange={(e) => handleInputChange("firstName", e)}
                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment-lastname"
                    sx={{ m: 1,width: "25ch" , marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={teacher.lastName}
                    name={"lastName"}
                    onChange={(e) => handleInputChange("lastName", e)}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Faculty Email"
                    id="fullWidth-faculty-email"
                    InputLabelProps={{ shrink: true }}
                    value={teacher.facultyEmail}
                    name={"facultyEmail"}
                    onChange={(e) => handleInputChange("facultyEmail", e)}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Personal Email"
                    id="fullWidth-personal-email"
                    InputLabelProps={{ shrink: true }}
                    value={teacher.personalEmail}
                    name={"personalEmail"}
                    onChange={(e) => handleInputChange("personalEmail", e)}
                />

                <TextField
                    label="Id Teacher"
                    id="outlined-start-adornment-id-teacher"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    value={teacher.idTeacher}
                    name={"idTeacher"}
                    onChange={(e) => handleInputChange("idTeacher", e)}
                />

                <TextField
                    label="Degree"
                    id="outlined-start-adornment-degree"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    value={teacher.degree}
                    name={"degree"}
                    onChange={(e) => handleInputChange("degree", e)}
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

export default SeeTeacherAccountAdmin;