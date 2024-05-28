import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MenuItem, TextField} from "@mui/material";
import {Teacher} from "../types.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";

function AddSingleTeacherToCourseAdmin(){
    const navigate = useNavigate();

    const {idCourses} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/api/v1/teachers', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Access-Control-Allow-Origin': '*',
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTeachers(data)});
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedTeacherId(event.target.value as string);
    };

    const handleCancel = () => {
        setSelectedTeacherId('');
    }

    const handleSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedTeacherId);

        const response = await fetch(`http://localhost:8081/api/v1/didactic/create/course=${idCourses}&teacher=${selectedTeacherId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Access-Control-Allow-Origin': '*',
            },

        });

        if(response.ok){
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
        }else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    //couse id deja il stiu de la params
    return (
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={"Add teacher to course"} subtitle={""}/>

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
                    select
                    label="Select a teacher"
                    value={selectedTeacherId}
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{ m: 1, marginBottom: "20px", width: "400px"}}
                >
                    {teachers.map((teacher) => (
                        <MenuItem key={teacher.idUsers} value={teacher.idUsers}>
                            {teacher.firstName} {teacher.lastName}
                        </MenuItem>
                    ))}
                </TextField>
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
                </Box>
            </Box>
            </form>

            );
}

export default AddSingleTeacherToCourseAdmin;