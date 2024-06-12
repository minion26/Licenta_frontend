import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
// import {DatePicker} from 'rsuite';

// import "rsuite/DatePicker/styles/index.css";
import {HomeworkAnnouncementsCreationDTO} from "../types.ts";




function HomeworkAnnouncementTeacher() {
    const {idCourses, idLectures} = useParams();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const [homeworkAnnouncement, setHomeworkAnnouncement] = useState<HomeworkAnnouncementsCreationDTO>({
        title: "",
        description: "",
        dueDate: null ,
        score: 0
    });

    const initialHomeworkAnnouncementState = {
        title: "",
        description: "",
        dueDate: null,
        score: 0
    };

    const handleCancel = () => {
        setHomeworkAnnouncement(initialHomeworkAnnouncementState);
    }

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setHomeworkAnnouncement({
            ...homeworkAnnouncement,
            [e.target.name]: value
        });
    }

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(homeworkAnnouncement);

        const response = await fetch(`http://localhost:8081/api/v1/homework-announcements/create/idLecture=${idLectures}`, {
            method: "POST",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(homeworkAnnouncement),
        });

        if(response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The announcement has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log("response:", data);
            }

            navigate(`/materials-per-lecture/${idCourses}/${idLectures}`);
        }else{
            const errorData = await response.json();
            await Swal.fire({
                icon: 'error',
                title: errorData.message || 'An error occurred',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <Header/>
        <UpperHeader title={"Create Homework Announcemet"} subtitle={"date"}/>
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
                    label="Title"
                    id="outlined-start-adornment-title"
                    sx={{m: 1, width: "25ch", marginBottom: "20px"}}
                    value={homeworkAnnouncement.title}
                    name="title"
                    onChange={handleChange}
                />


                <TextField
                    sx={{m: 1, marginBottom: "20px"}}
                    fullWidth
                    label="Description"
                    id="description"
                    multiline
                    rows={4}
                    value={homeworkAnnouncement.description}
                    name="description"
                    onChange={handleChange}
                />



                <TextField
                    id="outlined-date"
                    label="Date"
                    type="date"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={homeworkAnnouncement.dueDate ? homeworkAnnouncement.dueDate.toISOString().split('T')[0] : ''}
                    name="dueDate"
                    onChange={(e) => setHomeworkAnnouncement({...homeworkAnnouncement, dueDate: new Date(e.target.value)})}
                />




                <TextField
                    id="outlined-score"
                    label="Score"
                    type="number"
                    sx={{m: 1, width: "25ch", marginBottom: "20px"}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 100,
                    }}
                    value={homeworkAnnouncement.score}
                    name="score"
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

export default HomeworkAnnouncementTeacher;