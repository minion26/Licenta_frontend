import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function CreateCourseAdmin(){
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [course, setCourse] = useState({
        name: "",
        year: "",
        credits: "",
        semester: "",
        description: ""
    });

    const initialCourseState = {
        name: "",
        year: "",
        credits: "",
        semester: "",
        description: ""
    };

    const handleCancel = () => {
        setCourse(initialCourseState);
    };

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setCourse({
            ...course,
            [e.target.name]: value
        });
    };

    const handleSumbit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(course);

        const response = await fetch("http://localhost:8081/api/v1/courses/create", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(course)
        });

        if(response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The course has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/main-page-admin");
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error has occurred",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return (
        <form onSubmit={handleSumbit}>
            <Header />
            <UpperHeader title={"Create course"} subtitle={"date"}/>
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
                        label="Name"
                        id="outlined-start-adornment-name"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={course.name}
                        name={"name"}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Year"
                        id="outlined-start-adornment-year"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        inputProps={{
                            min: 1,
                            max: 3,
                        }}
                        value={course.year}
                        name={"year"}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-credits"
                        label="Credits"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 1,
                            max: 6,
                        }}
                        value={course.credits}
                        name={"credits"}
                        onChange={handleChange}
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
                        value={course.semester}
                        name={"semester"}
                        onChange={handleChange}
                    />

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Descprition"
                        id="description"
                        multiline
                        rows={4}
                        value={course.description}
                        name={"description"}
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

export default CreateCourseAdmin;